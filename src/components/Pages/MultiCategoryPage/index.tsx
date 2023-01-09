import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ToggleList } from '../../ToggleList';

interface IProps {
    data: any;
}

export const MultiCategoryPage: FC<IProps> = ({ data }) => {
    const { category, subCategory } = useParams();

    const getData = (category: any, subCategory: any) => {
        const d = data[`${category}`][`${subCategory}`];

        const keys = Object.keys(d).map((item) => {
            return {
                item,
                name: d[item]._meta?.title || d._meta?.title,
                subList: {
                    items: d[item],
                    keys: Object.keys(d[item]),
                },
            };
        });
        return keys;
    };

    return (
        <>
            {getData(category, subCategory).map((item) => <ToggleList data={item}/>)}
        </>
    );
};
