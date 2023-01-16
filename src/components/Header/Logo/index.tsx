import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoSVG } from 'src/assets/company/logo.svg';
import style from './style.module.css'

interface IProps {
}

export const Logo: FC<IProps> = () => {
    return (
        <div className={style.logo}>
            <Link to={'/'} >
                <LogoSVG />
            </Link>
        </div>
    );
};
