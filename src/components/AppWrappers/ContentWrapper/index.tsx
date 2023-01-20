import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    children: React.ReactNode
}

export const ContentWrapper: FC<IProps> = ({children}) => {
    return (
        <div className={style.wrapper}>
            {children}
        </div>
    )
}