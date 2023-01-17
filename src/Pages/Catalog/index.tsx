import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Category } from 'src/components/Category';

import './style.css';

interface IProps {
    data: {
       description?: string | null;
       img_link?: string | null;
       img_title?: string | null;
       key: string;
       menu_path?: string[];
       price?: string | null;
       subCategory: [];
       title: string;
    }[];
}

export const Catalog: FC<IProps> = ({ data }) => {

    const [renderData, setRenderData] = useState(data)

    const clickHandler = (item: {subCategory: [], title: string}) => {
        setRenderData(item.subCategory)
        if (!!item.title) console.log(item.title)
    }

    return (
        <div className="wrapper">
            <ul style={{display: 'flex', flexDirection: 'column'}}>
                {renderData.map(item => {

                    return (
                        <div style={{marginBottom: '20px'}}>
                            <li onClick={()=>clickHandler(item)}>{item.title}</li>
                            {item.subCategory ? <li>Есть подкатегории</li> : <li>Подкатегорий нет</li> }
                        </div>
                    )
                })}
            </ul>
            {/* {renderData.map((item: any) => <Category key={item.key} categoryKey={item.key} title={item.title}/>)} */}
        </div>
    );
};
