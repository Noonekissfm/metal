import { FC } from 'react';

import { AppTitle } from 'src/components/AppTitle';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';
import { Contacts } from 'src/components/Contacts';
import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { YandexMap } from 'src/components/YandexMap';
import { usePageMeta } from 'src/hooks';

import { Team } from './components/Team';
import { IPersonCard } from './components/Team/PersonCard';

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
    usePageMeta({
        title: 'Контакты',
        description: `Адрес, телефон и часы работы ${company}: Санкт-Петербург, пер. Челиева, 17.`,
    });

    return (
        <ContentWrapper>
            <div className={style.content}>
                <AppTitle title={company} level={1} />

                {/* Адрес раньше выводился дважды: в списке контактов через
                  * обёртку MobileSize, прятавшую его на телефоне, и ещё раз
                  * отдельной строкой под картой. */}
                <Backplate>
                    <Contacts>
                        <PhoneLink icon />
                        <MailLink icon />
                        <WorkTime icon />
                        <AddressLink icon />
                    </Contacts>
                </Backplate>

                <Backplate>
                    <YandexMap title={`Офис ${company}`} />
                </Backplate>

                <Team data={data} />
            </div>
        </ContentWrapper>
    );
};
