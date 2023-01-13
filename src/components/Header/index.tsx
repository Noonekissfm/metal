import React from 'react';
import { Contacts } from './Contacts';
import { Logo } from './Logo';

import './style.css';

export const Header = () => {
    return (
        <section className="section_header">
            <div className="wrapper">
                <div className="header">
                    <Logo />
                    <Contacts phone={true} mail={true} />
                </div>
            </div>
        </section>
    );
};
