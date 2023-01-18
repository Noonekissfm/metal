import React, { FC } from 'react';

import style from './style.module.css';
interface IProps {
    data: IPersonCard
}

export interface IPersonCard {
    photo_link: string;
    phone: string | null;
    email: string | null;
    name: string;
};

export const PersonCard: FC<IProps> = ({ data }) => {
    const { photo_link, phone, email, name } = data;
    return (
        
            <div className={style.personCard}>
                <div className={style.photo}>
                    <img src={require(`src/${photo_link}`)} alt="" />
                </div>
                <div className={style.info}>
                    <p className={style.name}>{name}</p>
                    {!!phone && <p className={style.phone}>{phone}</p>}
                    {!!email && <p className={style.email}>{email}</p>}
                </div>
            </div>
    );
};
