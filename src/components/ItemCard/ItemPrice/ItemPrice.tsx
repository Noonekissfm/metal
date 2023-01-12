import React, { FC } from 'react';
import './style.css';

interface IProps {
    price: string | undefined;
    phone: string;
}

export const ItemPrice: FC<IProps> = ({ price, phone }) => {
    
    return (
        <div className="ItemPrice__wrapper">
            {!!price?
            <>
                <p className="ItemPrice__price_wrapper">Стоимость одной тонны: <span className="ItemPrice__price">{`\u00A0${price}\u00A0`}</span>руб.</p>
                <div className='ItemPrice__order'><p>Сделать заказ можно по телефону:</p><span>{phone}</span></div>
            </>:
            <><p>Уточнить стоимость можно по телефону:</p><span>{phone}</span></>}
        </div>
    );
};
