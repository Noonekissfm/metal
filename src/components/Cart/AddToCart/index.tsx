import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppButton } from 'src/components/AppButton';
import { QtyInput } from 'src/components/Cart/QtyInput';
import { useCart } from 'src/context/CartContext';

import style from './style.module.css';

interface IProps {
    itemKey: string;
    title: string;
    menuPath: string[];
    unitPrice: number;
}

export const AddToCart: FC<IProps> = ({ itemKey, title, menuPath, unitPrice }) => {
    const { addItem, hasItem } = useCart();
    const [qty, setQty] = useState<number>(1);
    const inCart = hasItem(itemKey);

    const handleAdd = () => {
        addItem({ key: itemKey, title, menuPath, unitPrice, qty });
    };

    return (
        <div className={style.wrapper}>
            <QtyInput value={qty} onChange={setQty} />
            <AppButton buttonWidth="auto" title="В корзину" onClick={handleAdd} />
            {inCart && (
                <Link className={style.link} to="/cart">
                    Перейти в корзину
                </Link>
            )}
        </div>
    );
};
