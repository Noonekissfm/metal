import React, { FC } from 'react';
import './style.css';

interface IProps {}

export const Breadcrumbs: FC<IProps> = () => {
    return (
        <div className="wrapper">
            <div className="breadcrumbs">
                <p>Путь, до места, где сейчас находимся</p>
            </div>
        </div>
    );
};
