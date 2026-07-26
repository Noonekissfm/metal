import React, { FC, useEffect, useState } from 'react';

import { AppButton } from 'src/components/AppButton';
import { AppTitle } from 'src/components/AppTitle';
import { FormInput } from 'src/components/RequestCall/Form/components/input/input';
import { postOrder } from 'src/api/order';
import { useCart } from 'src/context/CartContext';
import { formatPrice } from 'src/utils/price';

import style from './style.module.css';

interface IProps {
    closeModal: () => void;
    onSuccess: () => void;
}

export const CheckoutForm: FC<IProps> = ({ closeModal, onSuccess }) => {
    const { items, total, clear } = useCart();
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSending) return;

        const formData = new FormData(e.target as HTMLFormElement);

        setIsSending(true);
        setError(null);

        const result = await postOrder({
            phone: String(formData.get('phoneNumber') || ''),
            name: String(formData.get('firstName') || ''),
            comment: String(formData.get('comment') || ''),
            company: String(formData.get('company') || ''),
            items,
            total,
        });

        setIsSending(false);

        if (!result.ok) {
            setError(result.error || 'Не удалось отправить заказ.');
            return;
        }

        clear();
        onSuccess();
    };

    return (
        <div className={style.backdrop} onClick={closeModal}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <AppTitle title="Оформление заказа" />

                <p className={style.summary}>
                    Позиций: {items.length}, на сумму <span>{formatPrice(total)}</span> руб.
                    Мы перезвоним и уточним детали.
                </p>

                <form method="post" className={style.form} onSubmit={handleSubmit}>
                    <div className={style.inputs}>
                        <FormInput type="text" placeholder="Телефон" name="phoneNumber" required />
                        <FormInput type="text" placeholder="Имя" name="firstName" />
                        <FormInput type="text" placeholder="Комментарий" name="comment" />
                        {/* Ловушка для ботов: человек это поле не видит и не заполняет. */}
                        <input
                            className={style.honeypot}
                            type="text"
                            name="company"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                        />
                    </div>

                    {error && <p className={style.error}>{error}</p>}

                    <AppButton
                        buttonWidth="block"
                        type="submit"
                        disabled={isSending}
                        title={isSending ? 'Отправляем…' : 'Отправить заказ'}
                    />
                </form>
            </div>
        </div>
    );
};
