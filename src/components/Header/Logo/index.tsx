import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { company } from '../../../types/companyInfo';

import logo from "../../../assets/company/logo.svg"
import style from './style.module.css'

interface IProps {
}

export const Logo: FC<IProps> = () => {
    return (
        <div className={style.logo}>
            <Link to={'/'} >
                <img src={logo} alt={company.name}/>
            </Link>
        </div>
    );
};
