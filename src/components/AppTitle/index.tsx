import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    title: string
}

export const AppTitle: FC<IProps> = ({title}) => {
    return (
        <>
            <h1 className={style.AppTitle}>{title}</h1>
        </>
    )
}