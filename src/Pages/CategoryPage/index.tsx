import React, { FC } from 'react';

import { usePageMeta, useUrlParams } from 'src/hooks';
import { useCatalog } from 'src/context/CatalogContext';

import { NotFoundPage, NOT_FOUND_TITLE } from '../NotFoundPage';
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

    // Заголовок страницы — название товара или категории, а описание —
    // путь до неё: на всё это раньше был один <title> из index.html.
    // Несуществующий адрес каталога рисует NotFoundPage внутри этой
    // страницы, и заголовок должен совпадать с тем, что ставит она сама:
    // эффект родителя выполняется последним и иначе перебил бы её.
    const metaTitle =
        status === 'not-found' ? NOT_FOUND_TITLE : product?.title || node?.title;
    // Последний элемент menu_path — сама страница, в описании она уже есть.
    const metaPath = (product?.menu_path || node?.menu_path || []).slice(0, -1).join(' / ');

    usePageMeta({
        title: metaTitle,
        description: metaTitle
            ? `${metaTitle}. ${metaPath ? `${metaPath}. ` : ''}Купить в Санкт-Петербурге со склада ООО «МЕТ-С».`
            : undefined,
    });

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
