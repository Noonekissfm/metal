import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

interface IProps {
    link: string;
    title: string;
}

export const PreviousPage: FC<IProps> = ({ link, title }) => {
    return (
        <li className='BcLink'>
            <Link to={link}>{title}</Link>
        </li>
    );
};
