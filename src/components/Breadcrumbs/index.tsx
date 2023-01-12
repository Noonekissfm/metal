import React, { FC } from 'react';
import { getLinksObject } from '../../utils/utils';
import { BcCurrentPage } from './BcCurrentPage/BcCurrentPage';
import { BcLink } from './BcLink/BcLink';
import './style.css';

interface IProps {
    keys: any,
    titles: any,
}

export const Breadcrumbs: FC<IProps> = ({keys, titles}) => {

    const links = getLinksObject(keys, titles)
    
    return (
        <ul className="breadcrumbs margin-bottom-30">
            {links.map((item: any, index: number) => index === links.length - 1?
            <BcCurrentPage key={item + '-' + index} title={item.title}/>:
            <BcLink link={item._link} title={item.title} key={item + '-' + index}/>)}
        </ul>
    );
};
