import React, { FC } from 'react'

import company from 'src/data/company.json';

import {ReactComponent as Clock} from 'src/assets/icons/clock.svg'
import style from './style.module.css';

interface IProps {
    icon?: boolean;
    strokeColor?: string;
    fillColor?: string;
}

export const WorkTime: FC<IProps> = ({icon=false, strokeColor='#000', fillColor='#000'}) => {
    const classList = ['wrapper', icon? '' : '--noIcon'].join('')
    return (
        <div className={style[classList]}>
            {icon && <Clock stroke={strokeColor} fill={fillColor}/>}
            <p>{company.workTime}</p>
        </div>
    )
}