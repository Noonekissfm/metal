import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// import './style.css';
import style from './style.module.css';

interface IProps {
    name: string;
    path: string;
}

export const ListItem: FC<IProps> = ({ name, path }) => {
    return <li className={style.ListItem}><NavLink className={({ isActive }) => isActive? style.active : undefined}  to={`${path}`}>{name}</NavLink></li>
};
