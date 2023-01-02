import React, { FC } from 'react';
import logo from "../../../assets/logo.png"
import './style.css'

interface IProps {
    size: number,
}

export const Logo: FC<IProps> = ({size}) => {
    return (
        <div className="logo">
            <img src={logo} alt="Logo"  height={size}/>
        </div>
    );
};
