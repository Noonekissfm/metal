import React, { FC } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface IProps {
    title: string,
    categoryKey: string,
}

export const Category: FC<IProps> = ({ categoryKey, title }) => {
    return (
        <li className="menu_item"><Link to={`${categoryKey}`} ><span>{title}</span></Link></li>
    );
};
