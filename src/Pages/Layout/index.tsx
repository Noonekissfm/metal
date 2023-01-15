import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from 'src/components/Header';

import { Logo } from 'src/components/Header/Logo';
import { Navbar } from 'src/components/Header/Navbar';
import { Footer } from 'src/components/Footer';
import { Contacts } from 'src/components/Contacts';

import style from './style.module.css';


interface IProps {}
export const Layout: FC<IProps> = () => {
    return (
        <>
            <Header>
                <Logo />
                <Navbar />
                <Contacts phone mail workTime />
            </Header>

            <div className={style.flexGrow}><Outlet /></div>
            <Footer />
        </>
    );
};