import React from 'react';
import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';

import style from './style.module.css';

export const InfoGroup = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.linkWrapper}><PhoneLink icon fillColor='#fff' strokeColor='#fff'/></div>
            <div className={style.linkWrapper}><MailLink icon fillColor='#fff' strokeColor='#fff'/></div>
            <div className={style.linkWrapper}><WorkTime icon fillColor='#fff' strokeColor='#fff'/></div>
            <div className={style.linkWrapper}><AddressLink icon fillColor='#fff' strokeColor='#fff'/></div>
        </div>
    )
}