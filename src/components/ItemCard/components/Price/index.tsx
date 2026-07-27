import React, { FC } from 'react';

import { AddToCart } from 'src/components/Cart/AddToCart';
import company from 'src/data/company.json';
import { formatPrice } from 'src/utils/price';

import style from './style.module.css';

interface IProps {
    /** Цена тонны со скидкой; null — цена по запросу. */
    unitPrice: number | null;
    itemKey: string;
    title: string;
    menuPath: string[];
    onRequestCall: () => void;
}

export const Price: FC<IProps> = ({ unitPrice, itemKey, title, menuPath, onRequestCall }) => {
    // Цена есть не у всех товаров. Раньше вместо неё выводилась строка
    // «Уточнить стоимость можно по телефону» в общем стиле — это выглядело
    // как ошибка вёрстки, а не как осмысленное состояние.
    if (unitPrice === null) {
        return (
            <div className={style.wrapper}>
                <p className={style.onRequest}>Цена по запросу</p>
                <p className={style.hint}>
                    Стоимость зависит от объёма и наличия — назовём её сразу по телефону.
                </p>
                <div className={style.actions}>
                    <a
                        className={style.callPrimary}
                        href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                    >
                        {company.phone}
                    </a>
                    <button type="button" className={style.callSecondary} onClick={onRequestCall}>
                        Заказать звонок
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={style.wrapper}>
            <p className={style.label}>Цена за тонну</p>
            <p className={style.amount}>
                {formatPrice(unitPrice)} <span className={style.currency}>руб.</span>
            </p>
            <AddToCart itemKey={itemKey} title={title} menuPath={menuPath} unitPrice={unitPrice} />
        </div>
    );
};
