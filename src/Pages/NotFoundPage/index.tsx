import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useGoBack } from 'src/utils/utils';

import './style.css';

interface IProps {

}

export const NotFoundPage: FC <IProps> = () => {
    
    return (
        <div className='not-found'>
            <p>Страница не найдена: 404. Вы можете вернуться <span onClick={useGoBack}>назад</span> или на <Link to={'/'}>главную</Link></p>
        </div>
    )
}