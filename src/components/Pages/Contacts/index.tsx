import { FC } from 'react';
import './style.css';

interface IProps {
    phone: string,
    workTime: string,
}

export const ContactsPage: FC<IProps> = ({phone, workTime}) => {
    return (
        <div className="wrapper">
            <div className="contacts">
                <h1 className='company'>МЕТ-С</h1>
                <ol>
                    <li>Телефон: {phone}</li>
                    {/* <li>E-mail: </li> */}
                    <li>Режим работы офиса: {workTime}</li>
                    <li>
                        Адрес офиса: г. Санкт-Петербург, вн.тер. г. Муниципальный Округ Народный, пер. Челиева, дом 17, литера А, помещение 3-Н, офис
                        317
                    </li>
                </ol>
            </div>
        </div>
    );
};
