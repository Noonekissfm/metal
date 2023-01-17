import React, { FC } from 'react';

import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import style from './style.module.css';

interface IProps {
    price: string | undefined;
}

export const Price: FC<IProps> = ({ price }) => {
    
    return (
        <div className={style.wrapper}>
            {!!price
            ?<>
                <p>Стоимость одной тонны: <span>{`\u00A0${price}\u00A0`}</span>руб.</p>
                <div>Сделать заказ можно по телефону:{'\u00A0'}<PhoneLink /></div>
            </>
            :<>
                <p>Уточнить стоимость можно по телефону:{'\u00A0'}<PhoneLink /></p>
            </>}
        </div>
    );
};
