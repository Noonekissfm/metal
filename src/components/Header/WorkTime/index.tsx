import React, { FC } from 'react'
import './style.css'
import clock from '../../../assets/clock.svg'



interface IProps {
}

export const WorkTime: FC<IProps> = ({}) => {
    return (
        <div className='contact'>
            <img src={clock} alt={"Режим работы"} />
            <p>ПН-ПТ: 9.00 - 17.00</p>
        </div>
    )
}