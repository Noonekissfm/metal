import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import { utils } from '../../../data/contacts';
import './style.css'

interface IProps {
}

export const Logo: FC<IProps> = () => {
    return (
        <div className='logo'>
            <Link to={'/'} >
                <img src={logo} alt={utils.companyName}/>
            </Link>
        </div>
    );
};
