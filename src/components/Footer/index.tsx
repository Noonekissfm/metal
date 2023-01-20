import React, { FC } from 'react';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';
import { MobileSize } from 'src/components/AppWrappers/MobileSize';
import { Contacts } from 'src/components/Contacts';
import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { Copyrights } from './components/Copyrights/Copyrights';

import style from './style.module.css';

interface IProps {}

export const Footer: FC<IProps> = () => {

    return (
        <footer className={style.footer}>
            <ContentWrapper>
                <div className={style.content}>
                    <Contacts>
                        <PhoneLink icon fillColor='#fff' />
                        <MailLink icon fillColor='#fff' />
                        <WorkTime icon fillColor='#fff' />
                        <MobileSize>
                            <AddressLink icon fillColor='#fff' />
                        </MobileSize>
                    </Contacts>
                    <Copyrights />
                </div>
            </ContentWrapper>
        </footer>
    );
};
