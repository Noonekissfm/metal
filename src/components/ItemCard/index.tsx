import React, { FC } from 'react';
import { utils } from '../../data/contacts';
import './style.css';

interface IProps {
    data: any;
}

export const ItemCard: FC<IProps> = ({ data }) => {
    const { title, price, description, img_link, img_title } = data;
    return (
        <div className="item_card">
            <div className="item_card__head">
                <p>{title}</p>
                {price ?
                <div className="item_card__price_section"><p>Стоимость одной тонны: <span className='item_price'>{price}</span> руб.</p><p>Сделать заказ можно по телефону: {utils.phone}</p></div> :
                <p>Уточнить стоимость можно по телефону: {utils.phone}</p>}
            </div>
            {img_link && (
                <div className="item_card_img">
                    <img src={require(`../../${img_link}`)} alt={img_title} />
                </div>
            )}
            {description && (
                <div>
                    <p className="item_card__description_header">Описание</p>
                </div>
            )}
        </div>
    );
};
