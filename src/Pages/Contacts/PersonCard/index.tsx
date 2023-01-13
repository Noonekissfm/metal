import React, { FC } from 'react';

import './style.css'

interface IProps {
    data: {
        photo_link: string | null;
        phone: string | null;
        email: string | null;
        name: string | null;
    };
}

export const PersonCard: FC<IProps> = ({ data }) => {
    const { photo_link, phone, email, name } = data;
    return (
        <div className="personCard">
            {!!photo_link ? <img className="personCard__photo" src="#" alt="#" /> : <div className="personCard__photo"></div>}
            <div className="personCard__info">
                {!!name && <p>{name}</p>}
                {!!phone && <p>{phone}</p>}
                {!!email && <p>{email}</p>}
            </div>
        </div>
    );
};
