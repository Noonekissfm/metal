import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    title: string,
}

export const CurrentPage: FC<IProps> = ({title}) => {
    return <li className={style.CurrentPage}>{title}</li>
};