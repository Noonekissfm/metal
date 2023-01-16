import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    data: Menu[]
}

interface Menu {
    title: string;
    url: string;
}

export const ShortcutMenu: FC<IProps> = ({data}) => {
    return (
        <ul className={style.ShortcutMenu}>
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
