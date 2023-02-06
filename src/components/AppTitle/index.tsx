import React, { FC } from 'react';
import company from 'src/data/company.json';

import style from './style.module.css';

interface IProps {
    title: string;
    borderless?: boolean;
}

export const AppTitle: FC<IProps> = ({ title, borderless }) => {
    const classList = [
        'AppTitle', 
        title === company.name ? '--companyName' : '',
        borderless? '--borderless' : '',
    ].join('');
    return <h1 className={style[classList]}>{title}</h1>;
};
