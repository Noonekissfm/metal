import React, { FC } from 'react';
import './style.css'

interface IProps {
    children: any,
    primary: boolean,
}

export const CardFooter: FC<IProps> = ({ children, primary }) => {
    return (
        <div className={`CardFooter--${primary? 'primary' : 'secondary'}`}>
            {children}
        </div>
    );
};
