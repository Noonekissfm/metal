import React, { FC } from 'react';
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
                <p className='item_card__title'>{title}</p>
                <ItemPrice price={price} primary={primary}/>
            </div>
            <CardFooter primary={primary}>
                {!!img_link && <ItemImg src={img_link} title={img_title} primary={primary} />}
                {!!renderDescription && <div className='cardFooter__description'><p>Описание</p><ItemDescription data={renderDescription} primary={primary} /></div>}
            </CardFooter>
        </div>
    );
};
