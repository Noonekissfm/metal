import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

interface Menu {
    title: string;
    url: string;
}

interface IProps {
    data: Menu[];
}

export const ShortMenu: FC<IProps> = ({ data }) => {
    return (
        // Раньше <Link> лежали прямо в <ul> без <li> — недопустимая разметка,
        // которую стили обходили селектором по потомку.
        <ul className={style.short_menu}>
            {data.map((item) => (
                <li key={item.url}>
                    <Link className={style.link} to={`/${item.url.replace(/^\//, '')}`}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
