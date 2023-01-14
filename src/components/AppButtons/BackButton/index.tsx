import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

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

    return (
        <>
            <span 
            className={`BackButton${primary? '--primary' : null}`} 
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