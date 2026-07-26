import React, { FC } from 'react';

import { Category } from 'src/components/Category';
import { ItemCard } from 'src/components/ItemCard';
import { CategoryNode, Product } from 'src/models/catalog';

import { Description } from '../Description';

import style from './style.module.css';

interface IProps {
    node: CategoryNode | null;
    products: Product[];
    product: Product | null;
    description: string;
}

export const CategoryItem: FC<IProps> = ({ node, products, product, description }) => {
    if (product) {
        return <ItemCard product={product} />;
    }

    if (!node) return null;

    // Порядок задан полем sort_order в CMS — сортировать на клиенте не нужно.
    const links = [
        ...node.children.map((child) => ({ key: child.key, title: child.title })),
        ...products.map((item) => ({ key: item.key, title: item.title })),
    ];

    return (
        <>
            {links.length > 0 && (
                <div className={style['menu_item_wrapper']}>
                    {links.map(
                        (item) =>
                            item.title && (
                                <Category categoryKey={item.key} title={item.title} key={item.key} />
                            ),
                    )}
                </div>
            )}
            {!!description && <Description description={description} title={node.title} />}
        </>
    );
};
