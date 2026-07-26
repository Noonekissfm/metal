import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    isOpen: boolean;
    onClick: () => void;
    /** id панели, которой управляет кнопка — для aria-controls. */
    controls: string;
}

export const BurgerButton: FC<IProps> = ({ isOpen, onClick, controls }) => {
    return (
        <button
            type="button"
            className={isOpen ? `${style.burger} ${style.burgerOpen}` : style.burger}
            onClick={onClick}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isOpen}
            aria-controls={controls}
        >
            <span className={style.bar} />
            <span className={style.bar} />
            <span className={style.bar} />
        </button>
    );
};
