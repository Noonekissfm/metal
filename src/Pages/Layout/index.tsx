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
                <NavbarListItem name="Каталог" path="/index" />
                {/* <NavbarListItem name="О Компании" path='/about'/> */}
                <NavbarListItem name="Контакты" path="/contacts" />
            </Navbar>
            <Outlet />
        </>
    );
};
