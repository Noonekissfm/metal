import React, { FC } from 'react';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import style from './style.module.css';

interface IProps {
    keys: string[];
    titles?: string[];
}

/** Крошки показываются на всех ширинах: на телефоне — в сокращённом виде.
 *  Раньше ниже 767px они просто исчезали, а вместо них была кнопка «Назад» —
 *  в каталоге на шесть уровней по ней не понять, где ты находишься. */
export const Navigation: FC<IProps> = ({ keys, titles }) => {
    if (!titles?.length) return null;

    return (
        <div className={style['Breadcrumbs__wrapper']}>
            <Backplate width="fit-content">
                <Breadcrumbs keys={keys} titles={titles} />
            </Backplate>
        </div>
    );
};
