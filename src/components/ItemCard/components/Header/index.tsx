import React, { FC } from 'react';
import { Price } from '../Price';

import style from './style.module.css';

interface IProps {
    title: string;
    price: string | null;
}

export const Header: FC<IProps> = ({title, price}) => {
    return (
        <div className={style['header-wrapper']}>
                <p>{title}</p>
                <Price price={price} />
        </div>
    )
}