import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import './style.css';

interface IProps {

}

export const NotFoundPage: FC <IProps> = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)
    
    return (
        <div className='not-found'>
            <h1>Страница не найдена: 404</h1>
            <p>Вы можете вернуться <span className='not-found__goback' onClick={goBack}>Назад</span> или <Link to={'/'}>На главную</Link></p>
        </div>
    )
}