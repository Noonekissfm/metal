import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {

}

export const NotFoundPage: FC <IProps> = () => {
    return (
        <p>Страница не найдена: 404. <Link to={'/'}>На главную</Link></p>
    )
}