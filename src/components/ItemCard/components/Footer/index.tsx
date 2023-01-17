import React, { FC } from 'react';
import style from './style.module.css';

interface IProps {
    children: React.ReactNode,
}

export const Footer: FC<IProps> = ({children}) => {
    return (
        <div className={style.Footer}>
            {children}
        </div>
    );
};
