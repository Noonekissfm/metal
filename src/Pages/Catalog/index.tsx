import React, { FC } from 'react';

import { Category } from 'src/components/Category';

import './style.css';

interface IProps {
    data: any;
}

export const Catalog: FC<IProps> = ({ data }) => {

    const renderData = data[0].subCategory


    return (
        <div className="wrapper">
            {renderData.map((item: any) => <Category key={item.key} categoryKey={item.key} title={item.title}/>)}
        </div>
    );
};
