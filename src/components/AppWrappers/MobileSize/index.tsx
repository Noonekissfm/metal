import React, { FC, ReactNode } from 'react';

import style from './style.module.css';

interface IProps {
    children: ReactNode
}

export const MobileSize: FC<IProps> = ({children}) => {
    return (
        <div className={style['mobile-size-wrapper']}>
            {children}
        </div>
    )
}