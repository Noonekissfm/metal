import React, { FC } from 'react'
import './style.css'
import clock from '../../../assets/clock.svg'



interface IProps {
    size: number
}

export const WorkTime: FC<IProps> = ({size}) => {
    return (
        <div className='contact'>
            <img src={clock} alt={"Режим работы"} width={size} height={size} />
            <p>ПН-ПТ: 9.00 - 17.00</p>
        </div>
    )
}