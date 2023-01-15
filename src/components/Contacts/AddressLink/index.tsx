import React, { FC } from 'react';
import { company } from 'src/types/companyInfo';
import { ReactComponent as Placemark } from 'src/assets/icons/pin.svg';

import style from './style.module.css';

interface IProps {
    icon?: boolean;
    strokeColor?: string;
    fillColor?: string;
}

export const AddressLink: FC<IProps> = ({icon=false, strokeColor='#000', fillColor='#000'}) => {
    const link = 'https://yandex.ru/maps/-/CCUvjIagtC'
    return (
        <div className={style.wrapper}>  
            {icon && <Placemark stroke={strokeColor} fill={fillColor}/>}
            <a href={link} target="_blank">{company.address}</a>
        </div>
    )
}