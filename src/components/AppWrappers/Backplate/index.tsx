import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    children?: React.ReactNode;
    width?: 'fit-content' | 'auto';
}

export const Backplate: FC<IProps> = ({ children, width = 'auto' }) => {
    return (
        <div style={{ width: width }} className={style.backplate}>
            {children}
        </div>
    );
};
