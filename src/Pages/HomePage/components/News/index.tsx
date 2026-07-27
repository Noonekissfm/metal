import React, { FC } from 'react';

import { AppTitle } from 'src/components/AppTitle';

import style from './style.module.css';

export interface INews {
    _id: number;
    body: string;
}

interface IProps {
    news: INews[];
}

/** Раньше здесь была карусель с точками — на одну-единственную новость
 *  из newsData.json. Теперь просто список карточек: при одной новости
 *  это одна карточка, при трёх — три. */
export const News: FC<IProps> = ({ news }) => {
    if (!news.length) return null;

    return (
        <section className={style.wrapper}>
            <AppTitle title="Новости компании" borderless />
            <ul className={style.list}>
                {news.map((item) => (
                    <li key={item._id} className={style.card}>
                        {item.body}
                    </li>
                ))}
            </ul>
        </section>
    );
};
