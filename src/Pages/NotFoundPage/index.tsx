import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';

import style from './style.module.css';

export const NotFoundPage: FC = () => {
    return (
        <ContentWrapper>
            <div className={style['not-found']}>
                <p className={style.code}>404</p>
                <h1 className={style.title}>Такой страницы не существует</h1>
                <p className={style.hint}>
                    Возможно, адрес набран с ошибкой или товар больше не в продаже.
                </p>

                {/* Раньше отсюда вела одна ссылка «Назад» — то есть ровно
                  * туда, откуда человек и пришёл на несуществующий адрес. */}
                <div className={style.actions}>
                    <Link className={style.primary} to="/catalog">
                        В каталог
                    </Link>
                    <Link className={style.secondary} to="/">
                        На главную
                    </Link>
                </div>
            </div>
        </ContentWrapper>
    );
};
