import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';
import { Navbar } from '../../Navbar';
import { NavbarListItem } from '../../Navbar/NavbarListItem';

interface IProps {}
export const Layout: FC<IProps> = () => {
    return (
        <>
            <Header />
            <Navbar>
                <NavbarListItem name="Каталог" path="/index" />
                {/* <NavbarListItem name="О Компании" path='/about'/> */}
                <NavbarListItem name="Контакты" path="/contacts" />
            </Navbar>
            <Outlet />
        </>
    );
};
