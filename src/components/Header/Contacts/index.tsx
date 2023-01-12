import React, { FC } from 'react';
import { utils } from '../../../data/contacts';
import { Contact } from '../../Contact/Contact';
import { WorkTime } from '../WorkTime';
import './style.css'

interface IProps {
    phone: boolean,
    mail: boolean,
}

export const Contacts: FC<IProps> = ({phone, mail}) => {
    return (
        <div className="header_contacts">
            {phone && <Contact type='phone' contact={utils.phone}/>}
            {mail && <Contact type='mail' contact={utils.mail}/>}
            <WorkTime />
        </div>
    );
};
