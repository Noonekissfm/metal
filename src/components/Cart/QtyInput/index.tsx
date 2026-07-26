import React, { FC, useEffect, useState } from 'react';

import { clampQty } from 'src/context/CartContext';

import style from './style.module.css';

interface IProps {
    value: number;
    onChange: (qty: number) => void;
    label?: string;
}

/** Количество в тоннах, дробное: 0,5 т — нормальный заказ.
 *  Поле держит собственный черновик, иначе очистить его и набрать
 *  новое число мешает нижняя граница в 0,1 т. */
export const QtyInput: FC<IProps> = ({ value, onChange, label = 'Количество, т' }) => {
    const [draft, setDraft] = useState<string>(String(value));

    useEffect(() => {
        setDraft((current) => (parseFloat(current) === value ? current : String(value)));
    }, [value]);

    const handleChange = (next: string) => {
        setDraft(next);

        const parsed = parseFloat(next);
        if (!Number.isNaN(parsed) && parsed >= 0.1) {
            onChange(parsed);
        }
    };

    const handleBlur = () => {
        const qty = clampQty(parseFloat(draft));
        setDraft(String(qty));
        onChange(qty);
    };

    return (
        <label className={style.wrapper}>
            <span className={style.label}>{label}</span>
            <input
                className={style.input}
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0.1"
                value={draft}
                aria-label={label}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
            />
            <span className={style.unit}>т</span>
        </label>
    );
};
