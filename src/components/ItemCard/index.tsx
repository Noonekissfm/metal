import React, { FC } from 'react';
import { utils } from '../../data/contacts';
import { getDescriptionData } from '../../utils/utils';
import { CardFooter } from './CardFooter/CardFooter';
import { ItemDescription } from './ItemDescription';
import { ItemImg } from './ItemImg';
import { ItemPrice } from './ItemPrice/ItemPrice';
import './style.css';

interface IProps {
    data: any;
}

export const ItemCard: FC<IProps> = ({ data }) => {
    const { title, price, description, img_link, img_title } = data;
    const renderDescription = !!description ? getDescriptionData(description) : null;
    const primary = !!img_link && !!renderDescription;
    return (
        <div className="item_card">
            <div className="item_card__head">
                <p>{title}</p>
                {price ? <ItemPrice price={price} phone={utils.phone} /> : <p>Уточнить стоимость можно по телефону: {utils.phone}</p>}
            </div>
            <CardFooter primary={primary}>
                {!!img_link && <ItemImg src={img_link} title={img_title} primary={primary} />}
                {!!renderDescription && (<ItemDescription data={renderDescription} primary={primary} />)}
            </CardFooter>
        </div>
    );
};
