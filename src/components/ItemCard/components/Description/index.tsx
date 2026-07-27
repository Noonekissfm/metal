import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    data: {
        description: string[];
        wordsCount: number;
    } | null;
    title: string;
}

export const Description: FC<IProps> = ({ data, title }) => {
    return (
        <section className={style.wrapper}>
            <h2 className={style.header}>Описание</h2>
            <div className={style.description}>
                {data?.description.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}

                {/* Часть товаров приходит из CMS вообще без описания. */}
                {!data && (
                    <>
                        <p>{title} — купить в компании ООО «МЕТ-С».</p>
                        <p>Вся продукция имеет заводские сертификаты.</p>
                    </>
                )}
            </div>
        </section>
    );
};
