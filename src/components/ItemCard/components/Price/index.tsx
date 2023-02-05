import React, { FC } from 'react';

import { PhoneLink } from 'src/components/Contacts/PhoneLink';

import style from './style.module.css';

interface IProps {
    price: string | null;
}

export const Price: FC<IProps> = ({ price }) => {
    const classList = ['wrapper', price ? '--price' : ''].join('')

    let discounted_price = null;
    if (price) {
        discounted_price = ((parseInt(price) * 0.98).toFixed(2)).toString();
    }

    return (
        <div className={style[classList]}>
            {!!price
                ? <>
                    <p>Стоимость одной тонны: <span>&nbsp;{discounted_price}&nbsp;</span>руб.</p>
                    <div className={style.order}>
                        <p>Сделать заказ можно по телефону: &nbsp;</p>
                        <PhoneLink />
                    </div>
                </>
                : <>
                    <p>Уточнить стоимость можно по телефону: &nbsp;</p><PhoneLink />
                </>}
        </div>
    );
};
