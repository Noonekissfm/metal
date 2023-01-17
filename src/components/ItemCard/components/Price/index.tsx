import React, { FC } from 'react';

import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import style from './style.module.css';

interface IProps {
    price: string | undefined;
}

export const Price: FC<IProps> = ({ price }) => {
    const classList = ['wrapper', price? '--price' : ''].join('')
    return (
        <div className={style[classList]}>
            {!!price
            ?<>
                <p>Стоимость одной тонны: <span>{`\u00A0${price}\u00A0`}</span>руб.</p>
                <div><p>Сделать заказ можно по телефону:{'\u00A0'}</p><PhoneLink /></div>
            </>
            :<>
                <p>Уточнить стоимость можно по телефону:{'\u00A0'}</p><PhoneLink />
            </>}
        </div>
    );
};
