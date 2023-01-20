import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'src/components/Header';
import { Logo } from 'src/components/Header/Logo';
import { Navbar } from 'src/components/Header/Navbar';
import { Footer } from 'src/components/Footer';
import { Contacts } from 'src/components/Contacts';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { MailLink } from 'src/components/Contacts/MailLink';

import style from './style.module.css';

interface IProps {}
export const Layout: FC<IProps> = () => {
    return (
        <>
            <Header>
                <Logo />
                <Navbar />
                <div className={style['contacts-wrapper']}>
                    <Contacts header>
                        <PhoneLink icon />
                        <MailLink icon />
                        <WorkTime icon />
                    </Contacts>
                </div>
            </Header>

            <div className={style.flexGrow}>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};
