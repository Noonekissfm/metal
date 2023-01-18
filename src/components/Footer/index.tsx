import React, { FC } from 'react';
import { MobileSize } from '../AppWrappers/MobileSize';
import { AddressLink } from '../Contacts/AddressLink';
import { MailLink } from '../Contacts/MailLink';
import { PhoneLink } from '../Contacts/PhoneLink';
import { WorkTime } from '../Contacts/WorkTime';
import { Copyrights } from './components/Copyrights/Copyrights';
import { InfoGroup } from './components/InfoGroup';

import style from './style.module.css';

interface IProps {}

export const Footer: FC<IProps> = () => {
    return (
        <footer className={style.footer}>
            <InfoGroup>
                <div className={style.linkWrapper}>
                    <PhoneLink icon fillColor="#fff" strokeColor="#fff" />
                </div>
                <div className={style.linkWrapper}>
                    <MailLink icon fillColor="#fff" strokeColor="#fff" />
                </div>
                <div className={style.linkWrapper}>
                    <WorkTime icon fillColor="#fff" strokeColor="#fff" />
                </div>
                <div className={style.linkWrapper}>
                    <AddressLink icon fillColor="#fff" strokeColor="#fff" />
                </div>
            </InfoGroup>
            <Copyrights />
        </footer>
    );
};
