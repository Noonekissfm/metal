import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    title: string,
    categoryKey: string,
}

export const Category: FC<IProps> = ({ categoryKey, title }) => {
    const clickHandler = () => {
        window.scrollTo({top: 0})
    }
    return (
        <Link to={`${categoryKey}`} onClick={clickHandler}>{title}</Link>
    );
};
