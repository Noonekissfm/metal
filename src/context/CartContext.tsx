import React, { createContext, FC, useContext, useEffect, useMemo, useReducer } from 'react';

import { lineTotal } from 'src/utils/price';

const STORAGE_KEY = 'metc.cart.v1';

/** Строка корзины — снимок товара на момент добавления.
 *  Так корзина, пролежавшая неделю, рисуется мгновенно и без сети,
 *  а менеджер видит в письме ту же цену, что видел покупатель. */
export interface CartLine {
    key: string;
    title: string;
    menuPath: string[];
    unitPrice: number;
    qty: number;
}

interface CartState {
    items: CartLine[];
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartLine }
    | { type: 'REMOVE_ITEM'; payload: { key: string } }
    | { type: 'SET_QTY'; payload: { key: string; qty: number } }
    | { type: 'SET_PRICE'; payload: { key: string; unitPrice: number } }
    | { type: 'CLEAR' };

const MIN_QTY = 0.1;
const MAX_QTY = 100000;

export const clampQty = (qty: number): number => {
    if (!Number.isFinite(qty)) return MIN_QTY;

    return Math.min(Math.max(Math.round(qty * 1000) / 1000, MIN_QTY), MAX_QTY);
};

// Редьюсер чистый: в dev StrictMode React вызывает его дважды.
const reducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existing = state.items.find((item) => item.key === action.payload.key);

            if (!existing) {
                return { items: [...state.items, action.payload] };
            }

            return {
                items: state.items.map((item) =>
                    item.key === action.payload.key
                        ? { ...item, qty: clampQty(item.qty + action.payload.qty) }
                        : item,
                ),
            };
        }
        case 'REMOVE_ITEM':
            return { items: state.items.filter((item) => item.key !== action.payload.key) };
        case 'SET_QTY':
            return {
                items: state.items.map((item) =>
                    item.key === action.payload.key
                        ? { ...item, qty: clampQty(action.payload.qty) }
                        : item,
                ),
            };
        case 'SET_PRICE':
            return {
                items: state.items.map((item) =>
                    item.key === action.payload.key
                        ? { ...item, unitPrice: action.payload.unitPrice }
                        : item,
                ),
            };
        case 'CLEAR':
            return { items: [] };
        default:
            return state;
    }
};

const readStorage = (): CartState => {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) return { items: [] };

        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed?.items)) return { items: [] };

        const items: CartLine[] = parsed.items
            .filter(
                (item: any) =>
                    item &&
                    typeof item.key === 'string' &&
                    typeof item.unitPrice === 'number' &&
                    typeof item.qty === 'number',
            )
            .map((item: any) => ({
                key: item.key,
                title: typeof item.title === 'string' ? item.title : item.key,
                menuPath: Array.isArray(item.menuPath) ? item.menuPath : [],
                unitPrice: item.unitPrice,
                qty: clampQty(item.qty),
            }));

        return { items };
    } catch {
        // Битый localStorage не должен ронять сайт.
        return { items: [] };
    }
};

interface ICartContext {
    items: CartLine[];
    itemsCount: number;
    total: number;
    addItem: (item: CartLine) => void;
    removeItem: (key: string) => void;
    setQty: (key: string, qty: number) => void;
    setPrice: (key: string, unitPrice: number) => void;
    clear: () => void;
    hasItem: (key: string) => boolean;
}

const CartContext = createContext<ICartContext | null>(null);

interface IProps {
    children: React.ReactNode;
}

export const CartProvider: FC<IProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, undefined, readStorage);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Приватный режим в Safari — корзина просто не переживёт перезагрузку.
        }
    }, [state]);

    const value = useMemo<ICartContext>(() => {
        return {
            items: state.items,
            itemsCount: state.items.length,
            total: state.items.reduce(
                (sum, item) => sum + lineTotal(item.unitPrice, item.qty),
                0,
            ),
            addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
            removeItem: (key) => dispatch({ type: 'REMOVE_ITEM', payload: { key } }),
            setQty: (key, qty) => dispatch({ type: 'SET_QTY', payload: { key, qty } }),
            setPrice: (key, unitPrice) => dispatch({ type: 'SET_PRICE', payload: { key, unitPrice } }),
            clear: () => dispatch({ type: 'CLEAR' }),
            hasItem: (key) => state.items.some((item) => item.key === key),
        };
    }, [state]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): ICartContext => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart используется вне CartProvider');
    }

    return context;
};
