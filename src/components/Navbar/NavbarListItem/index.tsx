import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

interface IProps {
    name: string;
    path: string;
}

export const NavbarListItem: FC<IProps> = ({ name, path }) => {
    return <li className="navbarListItem"><NavLink to={`${path}`}>{name}</NavLink></li>
};
