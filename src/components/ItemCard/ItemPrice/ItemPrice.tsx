import React, { FC } from 'react';
import './style.css';

interface IProps {
    price: string;
    phone: string;
}

export const ItemPrice: FC<IProps> = ({ price, phone }) => {
    return (
        <div className="ItemPrice__wrapper">
            <p>
                Стоимость одной тонны: <span className="ItemPrice__price">{price}</span> руб.
            </p>
            <p>Сделать заказ можно по телефону: {phone}</p>
        </div>
    );
};
