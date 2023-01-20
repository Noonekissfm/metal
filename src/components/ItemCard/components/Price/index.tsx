import React, { FC } from 'react';

import { PhoneLink } from 'src/components/Contacts/PhoneLink';

import style from './style.module.css';

interface IProps {
    price: string | null;
}

export const Price: FC<IProps> = ({ price }) => {
    const classList = ['wrapper', price? '--price' : ''].join('')
    return (
        <div className={style[classList]}>
            {!!price
            ?<>
                <p>Стоимость одной тонны: <span>&nbsp;{price}&nbsp;</span>руб.</p>
                <div className={style.order}>
                    <p>Сделать заказ можно по телефону: &nbsp;</p>
                    <PhoneLink />
                </div>
            </>
            :<>
                <p>Уточнить стоимость можно по телефону: &nbsp;</p><PhoneLink />
            </>}
        </div>
    );
};
