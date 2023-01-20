import React, { FC } from 'react';
import { ListItem } from './components/ListItem';


import style from './style.module.css';

interface IProps {
    
}

export const Navbar: FC<IProps> = () => {
    return (
        <nav className={style.navbar}>
            <ListItem name='О компании' path='/'/>
            <ListItem name='Каталог' path='/catalog'/>
            <ListItem name='Контакты' path='/contacts'/>
        </nav>
    );
};