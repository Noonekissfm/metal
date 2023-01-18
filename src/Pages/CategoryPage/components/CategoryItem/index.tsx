import React, { FC } from 'react';
import { Category } from 'src/components/Category';
import { ItemCard } from 'src/components/ItemCard';
import { sortData } from './utils';

import style from './style.module.css';
import { Description } from '../Description';

interface IProps {
    data: {
        title: string;
        price?: string | undefined;
        description?: string | undefined;
        img_link?: string | undefined;
        img_title?: string | undefined;
        subCategory?: {}[];
    }
}

export const CategoryItem: FC<IProps> = ({data}) => {
    const isSubCategory = data.subCategory && data.subCategory.length > 0;
    const isCategoryDescription = !!data.description && isSubCategory
    const renderData = isSubCategory && sortData(data.subCategory, 'title');


    return (
        <>
            {isSubCategory &&
                <div className={style['menu_item_wrapper']}>
                    {renderData.map((item: {title: string, key: string} ) => {
                        return (
                            item.title && <Category categoryKey={item.key} title={item.title} key={item.key} />
                        )
                    })}
                </div>}
                {isCategoryDescription && <Description description={data.description} />}
            {!isSubCategory && <ItemCard data={data}/>}
        </>
    )
}