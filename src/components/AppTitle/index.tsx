import React, { FC } from 'react';
import company from 'src/data/company.json';

import style from './style.module.css';

type Level = 1 | 2 | 3;

interface IProps {
    title: string;
    borderless?: boolean;
    /** На странице должен быть один h1, остальные заголовки — h2/h3. */
    level?: Level;
}

export const AppTitle: FC<IProps> = ({ title, borderless, level = 2 }) => {
    // Классы складываем через пробел: раньше был join(''), из-за чего
    // модификаторы не добавлялись к базовому классу, а подменяли его —
    // и оба флага вместе давали несуществующий AppTitle--companyName--borderless.
    const className = [
        style.AppTitle,
        title === company.name ? style['AppTitle--companyName'] : '',
        borderless ? style['AppTitle--borderless'] : '',
    ]
        .filter(Boolean)
        .join(' ');

    const Tag = `h${level}` as const;

    return <Tag className={className}>{title}</Tag>;
};
