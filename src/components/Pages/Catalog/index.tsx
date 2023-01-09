import React, { FC, useMemo } from 'react';

import { TCategory } from '../../../models/menu';
import { getSubCategories } from '../../../utils/utils';
import { Category } from '../../Category';

import './style.css';

interface IProps {
    data: any;
}

export const Catalog: FC<IProps> = ({ data }) => {
    const renderData: TCategory[] = useMemo(() => {
        const keys = Object.keys(data).filter((key) => key !== '_meta');

        return keys.map((key) => ({
            key,
            name: data[key]._meta.title,
            multilevel: data[key]._meta.subCategory,
            subCategories: getSubCategories(data, key),
        }));
    }, [data]);


    console.log(renderData)


    return (
        <div className="wrapper">
            <ul className="catalog">
                {renderData.map((item) => (
                    <Category key={item.key} data={item} />
                ))}
            </ul>
        </div>
    );
};
