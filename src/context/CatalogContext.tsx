import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { fetchCategories, fetchSettings } from 'src/api/catalog';
import { Category, CategoryNode, Product, Settings } from 'src/models/catalog';
import { applyDiscount, DEFAULT_DISCOUNT_PERCENT } from 'src/utils/price';

const CACHE_KEY = 'metc.catalog.v1';
/** Дерево меняется редко, но цена не должна «залипать» надолго. */
const CACHE_TTL_MS = 10 * 60 * 1000;

interface CatalogData {
    categories: Category[];
    settings: Settings;
}

const buildTree = (categories: Category[]): { root: CategoryNode | null; byKey: Map<string, CategoryNode> } => {
    const byKey = new Map<string, CategoryNode>();
    const byId = new Map<string, CategoryNode>();

    categories.forEach((category) => {
        const node: CategoryNode = { ...category, children: [] };
        byKey.set(node.key, node);
        byId.set(node.id, node);
    });

    let root: CategoryNode | null = null;

    byId.forEach((node) => {
        const parent = node.parent ? byId.get(node.parent) : undefined;

        if (parent) {
            parent.children.push(node);
        } else {
            root = node;
        }
    });

    byId.forEach((node) => {
        node.children.sort(
            (a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title, 'ru'),
        );
    });

    return { root, byKey };
};

const readCache = (): CatalogData | null => {
    try {
        const saved = window.sessionStorage.getItem(CACHE_KEY);
        if (!saved) return null;

        const parsed = JSON.parse(saved);
        if (!parsed || Date.now() - parsed.at > CACHE_TTL_MS) return null;
        if (!Array.isArray(parsed.data?.categories)) return null;

        return parsed.data as CatalogData;
    } catch {
        return null;
    }
};

const writeCache = (data: CatalogData) => {
    try {
        window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
    } catch {
        // Кэш — необязательная оптимизация, без него всё работает.
    }
};

interface ICatalogContext {
    isLoading: boolean;
    error: string | null;
    root: CategoryNode | null;
    settings: Settings;
    /** Категория по цепочке ключей из адреса; null — такого адреса нет. */
    getNodeByKeys: (keys: string[]) => CategoryNode | null;
    getCategoryByKey: (key: string) => CategoryNode | null;
    /** Цена товара со скидкой: своя, иначе от ближайшей категории сверху. */
    getEffectivePrice: (product: Pick<Product, 'price' | 'category'>) => number | null;
    reload: () => void;
}

const CatalogContext = createContext<ICatalogContext | null>(null);

interface IProps {
    children: React.ReactNode;
}

export const CatalogProvider: FC<IProps> = ({ children }) => {
    const [data, setData] = useState<CatalogData | null>(readCache);
    const [isLoading, setIsLoading] = useState(!data);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (data && attempt === 0) return;

        let cancelled = false;

        setIsLoading(true);
        setError(null);

        Promise.all([fetchCategories(), fetchSettings()])
            .then(([categories, settings]) => {
                if (cancelled) return;

                const loaded = { categories, settings };
                writeCache(loaded);
                setData(loaded);
            })
            .catch(() => {
                if (!cancelled) {
                    setError('Не удалось загрузить каталог. Обновите страницу или позвоните нам.');
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [attempt]); // eslint-disable-line react-hooks/exhaustive-deps

    const tree = useMemo(() => buildTree(data?.categories || []), [data]);

    const byId = useMemo(() => {
        const map = new Map<string, CategoryNode>();
        tree.byKey.forEach((node) => map.set(node.id, node));
        return map;
    }, [tree]);

    const getCategoryByKey = useCallback(
        (key: string) => tree.byKey.get(key) || null,
        [tree],
    );

    const getNodeByKeys = useCallback(
        (keys: string[]) => {
            if (!tree.root) return null;

            let node: CategoryNode = tree.root;

            // Первый ключ — корень каталога, дальше идём строго по детям:
            // несовпавший сегмент означает, что такой страницы нет.
            for (let i = 1; i < keys.length; i += 1) {
                const next = node.children.find((child) => child.key === keys[i]);

                if (!next) return null;

                node = next;
            }

            return node;
        },
        [tree],
    );

    const getEffectivePrice = useCallback(
        (product: Pick<Product, 'price' | 'category'>) => {
            let price = product.price;

            // PocketBase отдаёт незаполненное число как 0, а не как null,
            // поэтому пустой ценой считаем любое «ложное» значение —
            // иначе товар без своей цены показывался бы за 0 рублей.
            if (!price) {
                let node = byId.get(product.category);
                const seen = new Set<string>();

                while (node && !seen.has(node.id)) {
                    seen.add(node.id);

                    if (node.base_price) {
                        price = node.base_price;
                        break;
                    }

                    node = node.parent ? byId.get(node.parent) : undefined;
                }
            }

            return applyDiscount(
                price || null,
                data?.settings.discount_percent ?? DEFAULT_DISCOUNT_PERCENT,
            );
        },
        [byId, data],
    );

    const value = useMemo<ICatalogContext>(
        () => ({
            isLoading,
            error,
            root: tree.root,
            settings: data?.settings || { discount_percent: DEFAULT_DISCOUNT_PERCENT },
            getNodeByKeys,
            getCategoryByKey,
            getEffectivePrice,
            reload: () => setAttempt((current) => current + 1),
        }),
        [isLoading, error, tree, data, getNodeByKeys, getCategoryByKey, getEffectivePrice],
    );

    return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = (): ICatalogContext => {
    const context = useContext(CatalogContext);

    if (!context) {
        throw new Error('useCatalog используется вне CatalogProvider');
    }

    return context;
};
