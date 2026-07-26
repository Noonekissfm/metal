import React, { FC } from 'react';

import { useUrlParams } from 'src/hooks';
import { useCatalog } from 'src/context/CatalogContext';

import { NotFoundPage } from '../NotFoundPage';
import { Navigation } from './components/Navigation';
import { CategoryItem } from './components/CategoryItem';
import { useCategoryContent } from './useCategoryContent';

import style from './style.module.css';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';

const ROOT_TITLES = ['Каталог продукции'];

export const CategoryPage: FC = () => {
    const keys = useUrlParams();
    const catalog = useCatalog();
    const { status, node, products, product, description } = useCategoryContent(keys);

    if (status === 'not-found') {
        return <NotFoundPage />;
    }

    if (status === 'error') {
        return (
            <ContentWrapper>
                <div className={style.content}>
                    <p className={style.message}>
                        {catalog.error || 'Не удалось загрузить каталог. Попробуйте обновить страницу.'}
                    </p>
                    <button className={style.retry} type="button" onClick={catalog.reload}>
                        Попробовать снова
                    </button>
                </div>
            </ContentWrapper>
        );
    }

    if (status === 'loading') {
        return (
            <ContentWrapper>
                <div className={style.content}>
                    <p className={style.message}>Загружаем каталог…</p>
                </div>
            </ContentWrapper>
        );
    }

    const titles = product?.menu_path?.length
        ? product.menu_path
        : node?.menu_path?.length
        ? node.menu_path
        : ROOT_TITLES;

    return (
        <ContentWrapper>
            <div className={style.content}>
                <Navigation keys={keys} titles={titles} />
                <CategoryItem node={node} products={products} product={product} description={description} />
            </div>
        </ContentWrapper>
    );
};
