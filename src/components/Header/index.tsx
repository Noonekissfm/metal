import React from 'react';
import { Contacts } from './Contacts';
import { Logo } from './Logo';
import { WorkTime } from './WorkTime';

import './style.css';

export const Header = () => {
    return (
        <section className="section_header">
            <div className="wrapper">
                <div className="header">
                    <Logo size={60} />
                    <Contacts phone={true} mail={true} />
                    <WorkTime size={20} />
                </div>
            </div>
        </section>
    );
};
