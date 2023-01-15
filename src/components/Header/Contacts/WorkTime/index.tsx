import React, { FC } from 'react'

import clock from '../../../../assets/icons/clock.svg'
import style from './style.module.css';



interface IProps {
}

export const WorkTime: FC<IProps> = () => {
    return (
        <div className={style.workTime}>
            <img src={clock} alt={"Режим работы"} />
            <p>ПН-ПТ: 9.00 - 17.00</p>
        </div>
    )
}