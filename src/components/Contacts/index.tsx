import React, { FC } from 'react';

import style from './style.module.css'


interface IProps {
    children: React.ReactNode
    header?: boolean | undefined
}

export const Contacts: FC<IProps> = ({children, header=false}) => {
    const classList = header? 'wrapper--header' : 'wrapper'
    return (
        <div className={style[classList]}>
            {children}
        </div>
    );
};
