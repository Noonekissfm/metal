import React, { FC } from 'react';
import { utils } from '../../../data/contacts';
import { Contact } from '../../Contact/Contact';
import style from './style.module.css'
import { WorkTime } from './WorkTime';

interface IProps {
    phone?: boolean,
    mail?: boolean,
    workTime?: boolean,
}

export const Contacts: FC<IProps> = ({phone, mail, workTime}) => {

    return (
        <div className={style.wrapper}>
            {phone && <Contact icon={true} type='phone' contact={utils.phone}/>}
            {mail && <Contact icon={true} type='mail' contact={utils.mail}/>}
            {workTime && <WorkTime />}
        </div>
    );
};
