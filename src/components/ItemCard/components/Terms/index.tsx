import React, { FC } from 'react';

import company from 'src/data/company.json';

import style from './style.module.css';

/** НДС, минимальный заказ и срок поставки — то, что оптовый покупатель
 *  спрашивает первым делом. Текст берётся из company.json: пока строки
 *  пустые, блока просто нет, и вписать их можно без правки кода. */
const ROWS: Array<{ label: string; value: string }> = [
    { label: 'НДС', value: company.terms.vat },
    { label: 'Минимальный заказ', value: company.terms.minOrder },
    { label: 'Срок поставки', value: company.terms.delivery },
];

export const Terms: FC = () => {
    const rows = ROWS.filter((row) => !!row.value.trim());

    if (!rows.length) return null;

    return (
        <dl className={style.terms}>
            {rows.map((row) => (
                <div key={row.label} className={style.row}>
                    <dt className={style.label}>{row.label}</dt>
                    <dd className={style.value}>{row.value}</dd>
                </div>
            ))}
        </dl>
    );
};
