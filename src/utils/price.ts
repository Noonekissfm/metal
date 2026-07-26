// Одно место, где считается цена. И карточка товара, и корзина, и итог
// заказа зовут эти функции, поэтому разойтись они не могут.

export const DEFAULT_DISCOUNT_PERCENT = 2;

const priceFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const qtyFormatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 3,
});

/** Цены в каталоге — строки вида "297000.00". */
export const parsePrice = (price: string | number | null | undefined): number | null => {
    if (price === null || price === undefined || price === '') return null;

    const value = typeof price === 'number' ? price : parseFloat(price);

    return Number.isFinite(value) ? value : null;
};

export const applyDiscount = (
    price: number | null,
    discountPercent: number = DEFAULT_DISCOUNT_PERCENT,
): number | null => {
    if (price === null) return null;

    return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
};

/** 291060 -> "291 060,00" */
export const formatPrice = (value: number): string => priceFormatter.format(value);

/** 0.5 -> "0,5" */
export const formatQty = (value: number): string => qtyFormatter.format(value);

export const lineTotal = (unitPrice: number, qty: number): number =>
    Math.round(unitPrice * qty * 100) / 100;
