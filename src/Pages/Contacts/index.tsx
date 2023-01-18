import { FC } from 'react';
import { AppTitle } from 'src/components/AppTitle';
import { MobileSize } from 'src/components/AppWrappers/MobileSize';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { Contacts } from 'src/components/Contacts';
import { AddressLink } from 'src/components/Contacts/AddressLink';
import { MailLink } from 'src/components/Contacts/MailLink';
import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { WorkTime } from 'src/components/Contacts/WorkTime';
import { InfoGroup } from 'src/components/Footer/components/InfoGroup';
import { YandexMap } from 'src/components/YandexMap';
import { Team } from './components/Team';

import './style.css';
import style from './style.module.css';

interface IProps {
    phone: string;
    mail: string;
    workTime: string;
    company: string;
    adress: string;
    data: {
        team: any
    };
}

export const ContactsPage: FC<IProps> = ({ company, data }) => {
    return (
        <div className="contacts">
            <div className="wrapper">
                <div className="contacts">
                    <AppTitle title='ООО «МЕТ-С»' />
                    <div className={style['contacts-info_wrapper']}>
                        <InfoGroup>
                            <div className={style.linkWrapper}><PhoneLink icon fillColor='#fff' strokeColor='#fff'/></div>
                            <div className={style.linkWrapper}><MailLink icon fillColor='#fff' strokeColor='#fff'/></div>
                            <div className={style.linkWrapper}><WorkTime icon fillColor='#fff' strokeColor='#fff'/></div>
                            <MobileSize>
                                <div className={style.linkWrapper}><AddressLink icon fillColor='#fff' strokeColor='#fff'/></div>
                            </MobileSize>
                        </InfoGroup>
                    </div>
                    <div className={style['map-wrapper']}>
                        <Backplate>
                            <YandexMap title={`Офис ${company}`}/>
                        </Backplate>
                    </div>
                    <div className={style['address--mobile']}><AddressLink icon/></div>
                </div>
            <Team data={data} />
            </div>
        </div>
    );
};
