import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    link: string;
    title: string;
}

export const PreviousPage: FC<IProps> = ({ link, title }) => {
    return (
        <li className={style.PreviousPage}>
            <Link to={link}>{title}</Link>
        </li>
    );
};
