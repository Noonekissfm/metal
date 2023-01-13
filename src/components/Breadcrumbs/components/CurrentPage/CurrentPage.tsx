import React, { FC } from 'react';

import './style.css';

interface IProps {
    title: string,
}

export const CurrentPage: FC<IProps> = ({title}) => {
    return <li className='CurrentPage'>{title}</li>
};