import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    body: string;
}

export interface INews {
    _id: number;
    body: string;
}

export const NewsItem: FC<IProps> = ({body}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.body}>
                <p>{body}</p>
            </div>
        </div>
    );
};
