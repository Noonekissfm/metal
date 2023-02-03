import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    title: string;
    body: string;
}

export interface INews {
    _id: number;
    title: string;
    body: string;
}

export const NewsItem: FC<IProps> = ({title, body}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <h3 className={style.title}>{title}</h3>
            </div>
            <p className={style.body}>{body}</p>
        </div>
    );
};
