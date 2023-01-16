import React, { FC } from 'react';

import { CurrentPage } from './components/CurrentPage';

import { getLinksObject } from './utils';

import style from './style.module.css';
import { PreviousPage } from './components/PreviousPage';

interface IProps {
    keys: string[];
    titles: string[];
}

export const Breadcrumbs: FC<IProps> = ({ keys, titles }) => {
    const links = getLinksObject(keys, titles);

    // <Breadcrumbs keys={keys} titles={renderData.menu_path} />
    // <Breadcrumbs keys={['catalog']} titles={['Каталог продукции']} />}

    return (
        <ul className={style.breadcrumbs}>
            {links.map((item: any, index: number) => {
                const isLastLink = index === links.length - 1;
                const key = `${item}-${index}`;

                if (isLastLink) {
                    return <CurrentPage key={key} title={item.title} />;
                }

                return <PreviousPage link={item._link} title={item.title} key={key} />;
            })}
        </ul>
    );
};