import React, { FC } from 'react'
import './style.css'
import phone from '../../assets/phone.svg'
import mail from '../../assets/mail.svg'



interface IProps {
    type: 'phone' | 'mail',
    contact: string,
    size: number
}

export const Contact: FC<IProps> = ({type, contact, size}) => {
    return (
        <div className='contact'>
            {type === 'phone'? 
                <img src={phone} alt={`${type}`} width={size} height={size} /> : 
                <img src={mail} alt={`${type}`} width={size} height={size} /> 
            }
            <p>{contact}</p>
        </div>
    )
}