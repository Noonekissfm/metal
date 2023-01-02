import React, { FC, useMemo } from 'react';
import './style.css'


interface IProps {
    data: any,
}

export const Catalog: FC<IProps> = ({data}) => {
    const titlesArray = [];
    for (let key in data) {
        titlesArray.push(key)
    }
    return (
        <ul className='catalog'>
            {titlesArray.map(item => <li className='catalog_item'>{item}</li>)}
        </ul>
    )
}