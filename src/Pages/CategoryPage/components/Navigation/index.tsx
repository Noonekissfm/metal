import React, { FC } from 'react';
import { BackButton } from 'src/components/BackButton';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import style from './style.module.css';

interface IProps {
    keys: string[];
    titles?: string[];
}

/** Крошки и кнопку «Назад» рисуем всегда, а показывает нужное одна
 *  медиазапрос в стилях. Раньше то же самое решал useWindowDimensions с
 *  порогом 767 в коде и 767 в CSS — два числа, которые нужно было держать
 *  в согласии руками, плюс перерисовка на каждое событие resize. */
export const Navigation: FC<IProps> = ({ keys, titles }) => {
    return (
        <>
            {!!titles?.length && (
                <div className={style['Breadcrumbs__wrapper']}>
                    <Backplate width="fit-content">
                        <Breadcrumbs keys={keys} titles={titles} />
                    </Backplate>
                </div>
            )}
            <div className={style['BackButton__wrapper']}>
                <BackButton primary />
            </div>
        </>
    );
};
