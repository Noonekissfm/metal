import { useEffect, useState } from 'react';

import { fetchCategoryDescription, fetchProductByKey, fetchProductsByCategory } from 'src/api/catalog';
import { useCatalog } from 'src/context/CatalogContext';
import { CategoryNode, Product } from 'src/models/catalog';

type Status = 'loading' | 'category' | 'product' | 'not-found' | 'error';

interface CategoryContent {
    status: Status;
    node: CategoryNode | null;
    products: Product[];
    product: Product | null;
    /** Описание открытой категории: в общее дерево оно не входит. */
    description: string;
}

const EMPTY: CategoryContent = {
    status: 'loading',
    node: null,
    products: [],
    product: null,
    description: '',
};

/** Раскладывает адрес /catalog/a/b/c в категорию или товар.
 *  Товары грузятся только для открытой категории — один запрос на страницу. */
export const useCategoryContent = (keys: string[]): CategoryContent => {
    const catalog = useCatalog();
    const [content, setContent] = useState<CategoryContent>(EMPTY);

    const path = keys.join('/');

    useEffect(() => {
        if (catalog.isLoading) {
            setContent(EMPTY);
            return;
        }

        if (catalog.error) {
            setContent({ ...EMPTY, status: 'error' });
            return;
        }

        let cancelled = false;

        const node = catalog.getNodeByKeys(keys);

        if (node) {
            setContent({ ...EMPTY, node });

            Promise.all([fetchProductsByCategory(node.id), fetchCategoryDescription(node.id)])
                .then(([products, description]) => {
                    if (!cancelled) {
                        setContent({ status: 'category', node, products, product: null, description });
                    }
                })
                .catch(() => {
                    if (!cancelled) setContent({ ...EMPTY, status: 'error', node });
                });

            return () => {
                cancelled = true;
            };
        }

        // Последний сегмент может быть товаром. Проверяем и путь к нему:
        // несовпавший сегмент — это 404, а не «покажем что-нибудь похожее».
        const parent = catalog.getNodeByKeys(keys.slice(0, -1));
        const lastKey = keys[keys.length - 1];

        if (!parent || !lastKey) {
            setContent({ ...EMPTY, status: 'not-found' });
            return;
        }

        setContent({ ...EMPTY, status: 'loading' });

        fetchProductByKey(lastKey)
            .then((product) => {
                if (cancelled) return;

                if (!product || product.category !== parent.id) {
                    setContent({ ...EMPTY, status: 'not-found' });
                    return;
                }

                setContent({ ...EMPTY, status: 'product', node: parent, product });
            })
            .catch(() => {
                if (!cancelled) setContent({ ...EMPTY, status: 'error' });
            });

        return () => {
            cancelled = true;
        };
    }, [path, catalog.isLoading, catalog.error]); // eslint-disable-line react-hooks/exhaustive-deps

    return content;
};
