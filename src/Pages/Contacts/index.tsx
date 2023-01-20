import { FC } from 'react';
import { AppTitle } from 'src/components/AppTitle';
import { MobileSize } from 'src/components/AppWrappers/MobileSize';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { Contacts } from 'src/components/Contacts';
import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { YandexMap } from 'src/components/YandexMap';
import { Team } from './components/Team';
import { IPersonCard } from './components/Team/PersonCard';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';

import style from './style.module.css';

interface IProps {
    phone: string;
    mail: string;
    workTime: string;
    company: string;
    adress: string;
    data: IPersonCard[];
}

export const ContactsPage: FC<IProps> = ({ company, data }) => {
    return (
        <ContentWrapper>
            <div className={style.content}>
                <AppTitle title={company} />
                <Contacts>
                    <PhoneLink icon />
                    <MailLink icon />
                    <WorkTime icon />
                    <MobileSize>
                        <AddressLink icon />
                    </MobileSize>
                </Contacts>
                <div className={style['map-wrapper']}>
                    <Backplate>
                        <YandexMap title={`Офис ${company}`} />
                    </Backplate>
                </div>
                <div className={style['address--mobile']}>
                    <AddressLink />
                </div>
                <Team data={data} />
            </div>
        </ContentWrapper>
    );
};
