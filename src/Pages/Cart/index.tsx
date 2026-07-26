import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppButton } from 'src/components/AppButton';
import { AppTitle } from 'src/components/AppTitle';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { QtyInput } from 'src/components/Cart/QtyInput';
import { CheckoutForm } from 'src/components/Cart/CheckoutForm';
import { useCart } from 'src/context/CartContext';
import { formatPrice, lineTotal } from 'src/utils/price';
import { usePriceCheck } from './usePriceCheck';

import style from './style.module.css';

export const CartPage: FC = () => {
    const { items, total, setQty, removeItem } = useCart();
    const { changes, removed } = usePriceCheck();
    const [showCheckout, setShowCheckout] = useState(false);
    const [isDone, setIsDone] = useState(false);
    // Удаление подтверждается на месте: строку легко снести случайно,
    // а восстановить её нечем.
    const [confirmKey, setConfirmKey] = useState<string | null>(null);

    if (isDone) {
        return (
            <ContentWrapper>
                <div className={style.content}>
                    <AppTitle title="Заявка отправлена" level={1} />
                    <p className={style.empty}>
                        Мы получили ваш заказ и перезвоним в ближайшее время.
                    </p>
                    <Link className={style.link} to="/catalog">
                        Вернуться в каталог
                    </Link>
                </div>
            </ContentWrapper>
        );
    }

    if (!items.length) {
        return (
            <ContentWrapper>
                <div className={style.content}>
                    <AppTitle title="Корзина" level={1} />
                    <p className={style.empty}>Корзина пуста.</p>
                    <Link className={style.link} to="/catalog">
                        Перейти в каталог
                    </Link>
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>
            <div className={style.content}>
                <AppTitle title="Корзина" level={1} />

                {changes.length > 0 && (
                    <div className={style.notice}>
                        <p>Цены обновились с момента, когда вы добавили товар:</p>
                        <ul>
                            {changes.map((change) => (
                                <li key={change.key}>
                                    {change.title}: было {formatPrice(change.was)} руб., стало{' '}
                                    {formatPrice(change.now)} руб.
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {removed.length > 0 && (
                    <div className={style.notice}>
                        <p>Этих позиций больше нет в продаже, мы убрали их из корзины:</p>
                        <ul>
                            {removed.map((title) => (
                                <li key={title}>{title}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className={style.lines}>
                    {items.map((item) => (
                        <Backplate key={item.key}>
                            <div className={style.line}>
                                <div className={style.info}>
                                    <p className={style.title}>{item.title}</p>
                                    {item.menuPath.length > 0 && (
                                        <p className={style.path}>{item.menuPath.join(' / ')}</p>
                                    )}
                                    <p className={style.unitPrice}>
                                        {formatPrice(item.unitPrice)} руб. за тонну
                                    </p>
                                </div>

                                <div className={style.controls}>
                                    <QtyInput
                                        value={item.qty}
                                        onChange={(qty) => setQty(item.key, qty)}
                                    />
                                    <p className={style.sum}>
                                        {formatPrice(lineTotal(item.unitPrice, item.qty))} руб.
                                    </p>
                                    {confirmKey === item.key ? (
                                        <span className={style.confirm}>
                                            <button
                                                className={style.confirmYes}
                                                type="button"
                                                onClick={() => {
                                                    removeItem(item.key);
                                                    setConfirmKey(null);
                                                }}
                                            >
                                                Удалить
                                            </button>
                                            <button
                                                className={style.confirmNo}
                                                type="button"
                                                onClick={() => setConfirmKey(null)}
                                            >
                                                Отмена
                                            </button>
                                        </span>
                                    ) : (
                                        <button
                                            className={style.remove}
                                            type="button"
                                            aria-label={`Удалить: ${item.title}`}
                                            onClick={() => setConfirmKey(item.key)}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                aria-hidden="true"
                                            >
                                                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                                            </svg>
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Backplate>
                    ))}
                </div>

                <div className={style.footer}>
                    <p className={style.total}>
                        Итого: <span>{formatPrice(total)}</span> руб.
                    </p>
                    <AppButton
                        buttonWidth="auto"
                        title="Оформить заказ"
                        onClick={() => setShowCheckout(true)}
                    />
                </div>
            </div>

            {showCheckout && (
                <CheckoutForm
                    closeModal={() => setShowCheckout(false)}
                    onSuccess={() => {
                        setShowCheckout(false);
                        setIsDone(true);
                    }}
                />
            )}
        </ContentWrapper>
    );
};
