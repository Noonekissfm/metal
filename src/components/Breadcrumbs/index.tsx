import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface IProps {
    keys: any,
    titles: any,
}

export const Breadcrumbs: FC<IProps> = ({keys, titles}) => {
    
    let tempLink = '/index'

    const links = keys.map((item: any, index: number) => {
        return {
            key: item,
            title: titles[index + 1],
            _link: tempLink += '/' + item
        }
    })

    console.log(links)
    
    return (
        <>
            <div className="breadcrumbs margin-bottom-30">
                {links.map((item: any, index: number) => index === links.length - 1? <span className='breadcrumbs_item'>{item.title}</span> : <span className='breadcrumbs_item'><Link to={item._link}>{item.title}</Link></span>)}
            </div>
        </>
    );
};
