import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    title?: string,
    primary?: boolean,
    cursorPointer?: boolean,
    underlineText?: boolean,
    color?: string,
}

export const BackButton: FC<IProps> = ({title, underlineText, cursorPointer, color, primary}) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    const classList = ['BackButton', primary? '--primary' : ''].join('')

    return (
        <>
            <span 
            className={style[classList]} 
            onClick={goBack}
            style={{
                textDecoration: underlineText? 'underline' : 'none',
                cursor: cursorPointer? 'pointer' : 'atuo',
                color: color? color : 'inherit',
            }}
            >{title? title : 'Назад'}</span>
        </>
    )
}