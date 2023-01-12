import { FC } from 'react';
import { PersonCard } from './PersonCard';
import './style.css';

interface IProps {
    phone: string;
    workTime: string;
    company: string;
    adress: string;
    data: any;
}

export const ContactsPage: FC<IProps> = ({ phone, workTime, company, adress, data }) => {
    console.log(data.team);
    return (
        <div className="wrapper">
            <div className="contacts margin-bottom-30">
                <h1 className="company margin-bottom-30">{company}</h1>
                <ol>
                    <li>Телефон: {phone}</li>
                    {/* <li>E-mail: </li> */}
                    <li>Режим работы офиса: {workTime}</li>
                    <li>Адрес офиса: {adress}</li>
                </ol>
            </div>
            <h1 className='margin-top-30 align-center'>Наша команда</h1>
            <div className="OurTeam">
                {data.team.map((item: any, index: number) => (
                    <PersonCard key={`person-${index}`} data={item} />
                ))}
            </div>
        </div>
    );
};
