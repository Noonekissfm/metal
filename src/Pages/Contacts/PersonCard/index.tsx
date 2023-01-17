import React, { FC } from 'react';
import { Backplate } from 'src/components/Backplate';

import style from './style.module.css';
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
        <Backplate>
            <div className={style.personCard}>
                {<div className={style.photo}><img src={require(`../../../${photo_link}`)} alt="" /></div>}
                <div className={style.info}>
                    {!!name && <p className={style.name}>{name}</p>}
                    {!!phone && <p className={style.phone}>{phone}</p>}
                    {!!email && <p className={style.email}>{email}</p>}
                </div>
            </div>
        </Backplate>
    );
};
