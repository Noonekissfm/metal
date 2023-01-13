import React, { FC } from 'react';

import './style.css'

interface IProps {
    data: {
        photo_link: string;
        phone: string | null;
        email: string | null;
        name: string;
    };
}

export const PersonCard: FC<IProps> = ({ data }) => {
    const { photo_link, phone, email, name } = data;
    return (
        <div className="personCard">
            {<div className="personCard__photo"><img src={require(`../../../${photo_link}`)} alt="" /></div>}
            <div className="personCard__info">
                {!!name && <p className='personCard__info__name'>{name}</p>}
                {!!phone && <p className='personCard__info__phone'>{phone}</p>}
                {!!email && <p className='personCard__info__email'>{email}</p>}
            </div>
        </div>
    );
};
