import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/Header';

import { Logo } from 'src/components/Header/Logo';
import { Navbar } from 'src/components/Header/Navbar';
import { Contacts } from 'src/components/Header/Contacts';


interface IProps {}
export const Layout: FC<IProps> = () => {
    return (
        <>
            <Header>
                <Logo />
                <Navbar />
                <Contacts phone mail workTime />
            </Header>

            <Outlet />
        </>
    );
};
// interface IProps {}
// export const Layout: FC<IProps> = () => {
//     return (
//         <>
//             <Header />
//                 <Navbar>
//                     <NavbarListItem name="Каталог" path="/catalog" />
//                     <NavbarListItem name="Контакты" path="/contacts" />
//                     <NavbarListItem name="О Компании" path='/'/>
//                 </Navbar>
//             <Outlet />
//         </>
//     );
// };
