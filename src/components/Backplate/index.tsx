import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    children?: React.ReactNode;
    width?: string;
}

export const Backplate: FC<IProps> = ({children, width='auto'}) => {
    return (
        <div style={{width: width}} className={style.backplate}>
            {children}
        </div>
    )
}