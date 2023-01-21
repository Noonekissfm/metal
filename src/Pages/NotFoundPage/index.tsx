import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from 'src/components/BackButton';

import style from './style.module.css';

interface IProps {}

export const NotFoundPage: FC<IProps> = () => {
    return (
        <div className={style['not-found']}>
            <h1>Такой страницы не существует</h1>
            <p>Вы можете вернуться {<BackButton />} или <Link to={'/'}>На главную</Link></p>
        </div>
    );
};
