import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/Header';
import { Navbar } from 'src/components/Navbar';
import { NavbarListItem } from 'src/components/Navbar/NavbarListItem';

interface IProps {}
export const Layout: FC<IProps> = () => {
    return (
        <>
            <Header />
                <Navbar>
                    <NavbarListItem name="Каталог" path="/catalog" />
                    <NavbarListItem name="Контакты" path="/contacts" />
                    <NavbarListItem name="О Компании" path='/'/>
                </Navbar>
            <Outlet />
        </>
    );
};
