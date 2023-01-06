import React, { FC } from 'react';
import './style.css';

interface IProps {
    children: any;
}

export const Navbar: FC<IProps> = ({ children }) => {
    return (
        <section className="section_navbar">
            <div className="wrapper">
                <div className="navbar">
                    <ul>{children}</ul>
                </div>
            </div>
        </section>
    );
};
