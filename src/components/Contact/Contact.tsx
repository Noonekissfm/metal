import React, { FC } from 'react';

import phone from '../../assets/icons/phone.svg';
import mail from '../../assets/icons/mail.svg';
import style from './style.module.css';

interface IProps {
    icon?: boolean;
    type: 'phone' | 'mail';
    contact: string;
}

export const Contact: FC<IProps> = ({ type, contact, icon=false }) => {
    const isContactPhone = type === 'phone';
    return (
        <div className={style.contact}>
            {icon && (isContactPhone ? <img src={phone} alt={`${type}`} /> : <img src={mail} alt={`${type}`} />)}
            <a href={isContactPhone ? `tel:${contact}` : `mailto:${contact}`}>{contact}</a>
        </div>
    );
};
