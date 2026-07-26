import React, { FC } from 'react';
import { Price } from '../Price';

import style from './style.module.css';

interface IProps {
    title: string;
    /** Цена уже посчитана в каталоге: своя или от категории, со скидкой. */
    unitPrice: number | null;
    itemKey: string;
    menuPath: string[];
}

export const Header: FC<IProps> = ({title, unitPrice, itemKey, menuPath}) => {
    return (
        <div className={style['header-wrapper']}>
                <h1 className={style.title}>{title}</h1>
                <Price unitPrice={unitPrice} itemKey={itemKey} title={title} menuPath={menuPath} />
        </div>
    )
}
