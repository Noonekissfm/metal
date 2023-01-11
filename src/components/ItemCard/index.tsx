import React, { FC } from 'react';
import { utils } from '../../data/contacts';
import './style.css';

interface IProps {
    data: any;
}

export const ItemCard: FC<IProps> = ({ data }) => {
    const { title, price, description, img_link, img_title } = data;
    console.log(img_link);
    return (
        <div className="item_card">
            <div className="item_card__head">
                <p>{title}</p>
                <p>{price ? `Стоимость одной тонны: ${price} руб.` : `Уточнить стоимость можно по телефону: ${utils.phone}`}</p>
            </div>
            {img_link && (
                <div className="item_card_img">
                    <img src={img_link} alt={img_title} />
                </div>
            )}
            {description && (
                <div>
                    <p className="item_card__description_header">Описание</p>
                    <p className="item_card__description">{description}</p>
                </div>
            )}
        </div>
    );
};
