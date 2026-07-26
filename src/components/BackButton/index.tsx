import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './style.module.css';

interface IProps {
    title?: string;
    primary?: boolean;
    underlineText?: boolean;
    color?: string;
}

export const BackButton: FC<IProps> = ({ title, underlineText, color, primary = false }) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    // Раньше это был <span onClick>: с клавиатуры на него было не попасть,
    // и курсор оставался текстовым, потому что вызывающая сторона не
    // передавала отдельный флаг cursorPointer.
    return (
        <button
            type="button"
            className={primary ? style.wrapper : style.plain}
            onClick={goBack}
            style={{
                textDecoration: underlineText ? 'underline' : 'none',
                color: color || 'inherit',
            }}
        >
            {title || 'Назад'}
        </button>
    );
};
