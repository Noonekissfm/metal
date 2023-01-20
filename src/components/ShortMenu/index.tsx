import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    data: Menu[];
}

interface Menu {
    title: string;
    url: string;
}

export const ShortMenu: FC<IProps> = ({data}) => {
    return (
        <ul className={style.short_menu}>
            {data.map((item: Menu, index: number) => {
                const key = `${item.title}-${index}`;
                return (
                    <Link key={key} to={item.url}>
                        {item.title}
                    </Link>
                );
            })}
        </ul>
    );
};
