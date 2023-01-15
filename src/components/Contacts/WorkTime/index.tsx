import React, { FC } from 'react'

import { company } from 'src/types/companyInfo';

import {ReactComponent as Clock} from 'src/assets/icons/clock.svg'
import style from './style.module.css';

interface IProps {
    icon?: boolean;
    strokeColor?: string;
    fillColor?: string;
}

export const WorkTime: FC<IProps> = ({icon=false, strokeColor='#000', fillColor='#000'}) => {
    return (
        <div className={style.wrapper}>
            {icon && <Clock stroke={strokeColor} fill={fillColor}/>}
            <p>{company.workTime}</p>
        </div>
    )
}