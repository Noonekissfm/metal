import React, { FC } from 'react';

import { PhoneLink } from 'src/components/Contacts/PhoneLink';
import { AddToCart } from 'src/components/Cart/AddToCart';
import { formatPrice } from 'src/utils/price';

import style from './style.module.css';

interface IProps {
    /** Цена тонны со скидкой; null — цена по запросу. */
    unitPrice: number | null;
    itemKey: string;
    title: string;
    menuPath: string[];
}

export const Price: FC<IProps> = ({ unitPrice, itemKey, title, menuPath }) => {
    const classList = ['wrapper', unitPrice !== null ? '--price' : ''].join('');

    return (
        <div className={style[classList]}>
            {unitPrice !== null ? (
                <>
                    <p>
                        Стоимость одной тонны: <span>&nbsp;{formatPrice(unitPrice)}&nbsp;</span>руб.
                    </p>
                    <div className={style.order}>
                        <AddToCart
                            itemKey={itemKey}
                            title={title}
                            menuPath={menuPath}
                            unitPrice={unitPrice}
                        />
                    </div>
                </>
            ) : (
                <>
                    <p>Уточнить стоимость можно по телефону: &nbsp;</p>
                    <PhoneLink />
                </>
            )}
        </div>
    );
};
