import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from 'src/context/CartContext';

import style from './style.module.css';

export const CartButton: FC = () => {
    const { itemsCount } = useCart();

    return (
        <Link
            className={style.link}
            to="/cart"
            aria-label={itemsCount ? `Корзина, позиций: ${itemsCount}` : 'Корзина'}
        >
            <svg
                className={style.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.55L20.5 8H6" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="17.5" cy="20" r="1.4" />
            </svg>
            {itemsCount > 0 && <span className={style.badge}>{itemsCount}</span>}
        </Link>
    );
};
