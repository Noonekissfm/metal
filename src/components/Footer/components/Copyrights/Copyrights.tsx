import React, { FC } from 'react';
import { company } from 'src/types/companyInfo';

import style from './style.module.css';

interface IProps {}

export const Copyrights: FC<IProps> = () => {
    return (
        <div className={style.wrapper}>
            <p>{company.name}</p>
            <p>Все права защищены.</p>
            <p>&#169; 2022 &ndash; 2023</p>
        </div>
    )
}