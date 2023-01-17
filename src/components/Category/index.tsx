import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    title: string,
    categoryKey: string,
}

export const Category: FC<IProps> = ({ categoryKey, title }) => {
    return (
        <Link to={`${categoryKey}`}>{title}</Link>
    );
};
