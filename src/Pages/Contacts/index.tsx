import { FC } from 'react';
import { InfoGroup } from 'src/components/Footer/components/InfoGroup';
import { YandexMap } from 'src/components/YandexMap';

import { PersonCard } from 'src/Pages/Contacts/PersonCard';

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

export const ContactsPage: FC<IProps> = ({ phone, mail, workTime, company, adress, data }) => {
    return (
        <div className="contacts">
            <div className="wrapper">
                <div className="contacts">
                    <h1 className="contacts_title company">{company}</h1>
                    <div className={style['contacts-info_wrapper']}><InfoGroup /></div>
                    <YandexMap title={`Офис ${company}`}/>
                </div>
                <div className="OurTeam">
                    <h1 className='contacts_title'>Наша команда</h1>
                    <div className="teammates">
                        {data.team.map((item: any, index: number) => (
                            <PersonCard key={`person-${index}`} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
