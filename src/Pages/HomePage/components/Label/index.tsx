import React, { FC } from 'react';
import { ReactComponent as Logo } from 'src/assets/company/logo.svg';

import style from './style.module.css';

interface IProps {}

export const Label: FC<IProps> = () => {
    return (
        <div className={style.label}>
            <div className={style.logoWrapper}>
                <Logo />
            </div>
        </div>
    );
};
