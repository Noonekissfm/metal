import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    component?: React.ReactNode;
    width?: string;
}

export const Backplate: FC<IProps> = ({component, width='auto'}) => {
    return (
        <div style={{width: width}} className={style.backplate}>
            {component}
        </div>
    )
}