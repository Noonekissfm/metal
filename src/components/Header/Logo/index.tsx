import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { utils } from '../../../data/contacts';

import logo from "../../../assets/company/cleanest_logo.svg"
import style from './style.module.css'

interface IProps {
}

export const Logo: FC<IProps> = () => {
    return (
        <div className={style.logo}>
            <Link to={'/'} >
                <img src={logo} alt={utils.companyName}/>
            </Link>
        </div>
    );
};
