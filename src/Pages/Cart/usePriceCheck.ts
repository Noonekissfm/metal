import { useEffect, useState } from 'react';

import { fetchProductByKey } from 'src/api/catalog';
import { useCart } from 'src/context/CartContext';
import { useCatalog } from 'src/context/CatalogContext';

export interface PriceChange {
    key: string;
    title: string;
    was: number;
    now: number;
}

/** Корзина живёт в localStorage сколько угодно, поэтому при открытии
 *  страницы цены сверяются с каталогом. Изменившиеся сразу обновляются,
 *  а покупатель видит, что именно поменялось. */
export const usePriceCheck = () => {
    const { items, setPrice, removeItem } = useCart();
    const { isLoading, getEffectivePrice } = useCatalog();
    const [changes, setChanges] = useState<PriceChange[]>([]);
    const [removed, setRemoved] = useState<string[]>([]);

    useEffect(() => {
        if (isLoading || !items.length) return;

        let cancelled = false;

        // Список берётся один раз при открытии страницы: правки количества
        // не должны каждый раз дёргать сеть.
        const snapshot = items.map((item) => ({ ...item }));

        Promise.all(
            snapshot.map((item) =>
                fetchProductByKey(item.key)
                    .then((product) => ({ item, product }))
                    .catch(() => null),
            ),
        ).then((results) => {
            if (cancelled) return;

            const priceChanges: PriceChange[] = [];
            const gone: string[] = [];

            results.forEach((result) => {
                if (!result) return;

                const { item, product } = result;

                if (!product) {
                    gone.push(item.title);
                    removeItem(item.key);
                    return;
                }

                const actual = getEffectivePrice(product);

                if (actual === null) {
                    gone.push(item.title);
                    removeItem(item.key);
                    return;
                }

                if (Math.abs(actual - item.unitPrice) > 0.01) {
                    priceChanges.push({
                        key: item.key,
                        title: item.title,
                        was: item.unitPrice,
                        now: actual,
                    });
                    setPrice(item.key, actual);
                }
            });

            setChanges(priceChanges);
            setRemoved(gone);
        });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return { changes, removed };
};
