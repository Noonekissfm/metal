import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import './style.css'

interface IProps {
    size: number,
}

export const Logo: FC<IProps> = ({size}) => {
    return (
        <Link to={'/'} className="logo">
            <img src={logo} alt="Logo"  height={size}/>
        </Link>
    );
};
