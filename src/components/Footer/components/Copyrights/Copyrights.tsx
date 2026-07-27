import React, { FC } from 'react';
import company from 'src/data/company.json';

import style from './style.module.css';

interface IProps {}

const START_YEAR = 2022;
const MIN_END_YEAR = 2026;

export const Copyrights: FC<IProps> = () => {
    const endYear = Math.max(MIN_END_YEAR, new Date().getFullYear());

    return (
        <div className={style.wrapper}>
            <p>{company.name}</p>
            <p>Все права защищены.</p>
            <p>
                &#169; {START_YEAR} &ndash; {endYear}
            </p>
        </div>
    );
};
