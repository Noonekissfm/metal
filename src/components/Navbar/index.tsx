import React, { FC } from 'react';
import './style.css';

interface IProps {
    children: any,
}

export const Navbar: FC<IProps> = ({children}) => {
    return (
        <div className='navbar'>
            <ul>
                {children}
            </ul>
        </div>
    );
};
