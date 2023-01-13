import { FC } from 'react';

import { PersonCard } from 'src/Pages/Contacts/PersonCard';

import './style.css';

interface IProps {
    phone: string;
    workTime: string;
    company: string;
    adress: string;
    data: {
        team: any
    };
}

export const ContactsPage: FC<IProps> = ({ phone, workTime, company, adress, data }) => {
    return (
        <div className="contacts">
            <div className="wrapper">
                <div className="contacts">
                    <h1 className="contacts_title company">{company}</h1>
                    <ol>
                        <li>Телефон: {phone}</li>
                        {/* <li>E-mail: </li> */}
                        <li>Режим работы офиса: {workTime}</li>
                        <li>Адрес офиса: {adress}</li>
                    </ol>
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
