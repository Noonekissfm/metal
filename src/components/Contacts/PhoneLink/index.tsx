import React, { FC } from 'react';
import company from 'src/data/company.json';
import { ReactComponent as Phone } from 'src/assets/icons/phone.svg';

import style from './style.module.css';

interface IProps {
    icon?: boolean;
    strokeColor?: string;
    fillColor?: string;
}

export const PhoneLink: FC<IProps> = ({icon=false, strokeColor='#000', fillColor='#000'}) => {
    const phone = company.phone.match(/\d/gi)?.join('')
    const classList = ['wrapper', icon? '' : '--noIcon'].join('')
    return (
        <div className={style[classList]}>  
            {icon && <Phone stroke={strokeColor} fill={fillColor}/>}
            <a href={`tel:${phone}`}>{company.phone}</a>
        </div>
    )
}