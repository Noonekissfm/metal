import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from 'src/components/AppButtons/BackButton';

import './style.css';

interface IProps {}

export const NotFoundPage: FC<IProps> = () => {
    return (
        <div className="not-found">
            <div className="not-found__text-wrapper">
                <h1 className="not-found__title">Такой страницы не существует</h1>
                <p className="not-found__description">
                    Вы можете вернуться {<BackButton underlineText/>} или <Link to={'/'}>На главную</Link>
                </p>
            </div>
        </div>
    );
};
