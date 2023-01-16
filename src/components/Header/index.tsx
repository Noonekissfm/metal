import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    children: any,
}

export const Header: FC<IProps> = ({children}) => {
    return (
        <section className={style.section}>
            <div className={style.wrapper}>
                {children}
            </div>
        </section>
    );
};