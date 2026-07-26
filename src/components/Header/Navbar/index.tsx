import React, { FC } from 'react';
import { ListItem } from './components/ListItem';

import style from './style.module.css';

interface IProps {
    /** В выезжающей панели пункты идут столбцом. */
    vertical?: boolean;
}

export const Navbar: FC<IProps> = ({ vertical = false }) => {
    return (
        <nav className={vertical ? `${style.navbar} ${style.vertical}` : style.navbar}>
            <ListItem name="О компании" path="/" />
            <ListItem name="Каталог" path="/catalog" />
            <ListItem name="Контакты" path="/contacts" />
        </nav>
    );
};
