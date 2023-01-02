import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
    name: string;
    path: string;
}

export const NavbarListItem: FC<IProps> = ({ name, path }) => {
    return <Link to={`${path}`}><li className="navbarListItem">{name}</li></Link>
};
