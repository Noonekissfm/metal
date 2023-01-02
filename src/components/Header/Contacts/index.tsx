import React, { FC } from 'react';
import { Contact } from '../../Contact/Contact';
import './style.css'

interface IProps {
    phone: boolean,
    mail: boolean,
}

export const Contacts: FC<IProps> = ({phone, mail}) => {
    return (
        <div className="header_contacts">
            {phone && <Contact size={20} type='phone' contact='7(999)999-99-99'/>}
            {mail && <Contact size={20} type='mail' contact='example@example.ru'/>}
        </div>
    );
};
