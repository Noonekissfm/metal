import React, { FC } from 'react';
import { company } from 'src/types/companyInfo';
import { ReactComponent as Mail } from 'src/assets/icons/mail.svg';

import style from './style.module.css';

interface IProps {
    icon?: boolean;
    strokeColor?: string;
    fillColor?: string;
}

export const MailLink: FC<IProps> = ({icon=false, strokeColor='#000', fillColor='#000'}) => {
    return (
        <div className={style.wrapper}>  
            {icon && <Mail stroke={strokeColor} fill={fillColor}/>}
            <a href={`mailto:${company.mail}`}>{company.mail}</a>
        </div>
    )
}