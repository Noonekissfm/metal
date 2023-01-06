import React, { FC, useMemo, useState } from 'react';
import './style.css';

interface IProps {
    data: any;
}

export const Catalog: FC<IProps> = ({ data }) => {
    const renderData = useMemo(
        () =>
            Object.keys(data).map((key) => ({
                category: data[key]._meta,
                subCategories: Object.keys(data[key]),
                meta: data[key]._meta,
            })),
        [data]
    );

    
    return (
        <div className="wrapper">
            <ul className="catalog">
                {renderData.map(item => (
                    <li className='catalog_item'>{item.category?.title}</li>
                ))}
            </ul>
        </div>
    );
};
