import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    title: string;
    date: string;
    body: string;
}

export interface INews {
    _id: number;
    title: string;
    date: string;
    body: string;
}

export const NewsItem: FC<IProps> = ({title, date, body}) => {
    return (
        <div>
            <div className={style.header}>
                <h3 className={style.title}>{title}</h3>
                <span className={style.date}>{date}</span>
            </div>
            <p className={style.body}>{body}</p>
        </div>
    );
};
