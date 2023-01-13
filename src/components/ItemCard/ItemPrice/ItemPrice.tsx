import React, { FC } from 'react';
import './style.css';

interface IProps {
    price: string | undefined;
    phone: string;
    primary: boolean;
}

export const ItemPrice: FC<IProps> = ({ price, phone, primary }) => {
    
    return (
        <div className={`ItemPrice__wrapper--${primary && !!price? 'primary' : 'secondary'}`}>
            {!!price?
            <>
                <p className="ItemPrice__price_wrapper">Стоимость одной тонны: <span className="ItemPrice__price">{`\u00A0${price}\u00A0`}</span>руб.</p>
                <div className='ItemPrice__order'><p>Сделать заказ можно по телефону:</p><span>{`\u00A0${phone}`}</span></div>
            </>:
            <><p>Уточнить стоимость можно по телефону:</p><span>{`\u00A0${phone}`}</span></>}
        </div>
    );
};
