import React, { FC } from 'react';
import './style.css';

interface IProps {
    title: string,
}

export const BcCurrentPage: FC<IProps> = ({title}) => {
    return <li className='BcCurrentPage'>{title}</li>
};