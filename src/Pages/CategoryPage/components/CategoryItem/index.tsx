import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ItemCard } from 'src/components/ItemCard';
import { CategoryNode, Product } from 'src/models/catalog';

import { Description } from '../Description';

import style from './style.module.css';

/** Ниже этого числа строк заголовки-буквы только мешают. Выше — без них
 *  в списке не сориентироваться: у самой большой категории 392 строки. */
const GROUPING_THRESHOLD = 30;

interface Row {
    key: string;
    title: string;
}

interface Group {
    letter: string;
    rows: Row[];
}

/** В названиях из CMS попадаются латинские двойники кириллицы («Cталь 40Х13»
 *  начинается с латинской C). Визуально это та же буква, поэтому и группа
 *  должна быть та же — иначе один товар отрезает от списка «С» кусок
 *  и над ним появляется заголовок-буква на ровном месте. */
const LOOKALIKES: Record<string, string> = {
    A: 'А', B: 'В', C: 'С', E: 'Е', H: 'Н', K: 'К', M: 'М',
    O: 'О', P: 'Р', T: 'Т', X: 'Х', Y: 'У',
};

/** Первый знак названия: буква, «0–9» для цифр, «#» для всего прочего. */
const groupLetter = (title: string): string => {
    const first = title.trim().charAt(0);

    if (!first) return '#';
    if (/\d/.test(first)) return '0–9';

    if (/\p{L}/u.test(first)) {
        const upper = first.toLocaleUpperCase('ru');

        return LOOKALIKES[upper] || upper;
    }

    return '#';
};

/** Группы собираются по букве, а не по подряд идущим строкам: порядок из CMS
 *  местами сбит, и одна и та же буква иначе повторяется несколько раз. */
const groupRows = (rows: Row[]): Group[] => {
    const byLetter = new Map<string, Group>();

    rows.forEach((row) => {
        const letter = groupLetter(row.title);
        const group = byLetter.get(letter);

        if (group) {
            group.rows.push(row);
        } else {
            byLetter.set(letter, { letter, rows: [row] });
        }
    });

    return Array.from(byLetter.values());
};

interface IProps {
    node: CategoryNode | null;
    products: Product[];
    product: Product | null;
    description: string;
}

export const CategoryItem: FC<IProps> = ({ node, products, product, description }) => {
    // Порядок задан полем sort_order в CMS — сортировать на клиенте не нужно.
    const rows = useMemo<Row[]>(
        () =>
            node
                ? [
                      ...node.children.map((child) => ({ key: child.key, title: child.title })),
                      ...products.map((item) => ({ key: item.key, title: item.title })),
                  ].filter((row) => !!row.title)
                : [],
        [node, products],
    );

    const groups = useMemo(() => {
        if (rows.length <= GROUPING_THRESHOLD) return null;

        const grouped = groupRows(rows);

        // Внутри листа названия обычно однотипные («Труба бесшовная г/д …»),
        // и все 392 строки попадают в одну группу «Т». Такой заголовок
        // ничего не разделяет, поэтому показываем буквы, только если групп
        // и правда несколько.
        return grouped.length > 1 ? grouped : null;
    }, [rows]);

    if (product) {
        return <ItemCard product={product} />;
    }

    if (!node) return null;

    const renderRow = (row: Row) => (
        <li key={row.key}>
            <Link className={style.row} to={row.key} onClick={() => window.scrollTo({ top: 0 })}>
                <span className={style.rowTitle}>{row.title}</span>
            </Link>
        </li>
    );

    return (
        <>
            {groups ? (
                groups.map((group) => (
                    <section key={group.letter} className={style.group}>
                        <h2 className={style.groupTitle}>{group.letter}</h2>
                        <ul className={style.list}>{group.rows.map(renderRow)}</ul>
                    </section>
                ))
            ) : (
                <ul className={style.list}>{rows.map(renderRow)}</ul>
            )}

            {!!description && <Description description={description} title={node.title} />}
        </>
    );
};
