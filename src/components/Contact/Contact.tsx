import React, { FC } from 'react'
import './style.css'
import phone from '../../assets/phone.svg'
import mail from '../../assets/mail.svg'



interface IProps {
    type: 'phone' | 'mail',
    contact: string,
}

export const Contact: FC<IProps> = ({type, contact}) => {
    const isContactPhone = type === 'phone'
    return (
        <div className='contact'>
            {type === 'phone'? 
                <img src={phone} alt={`${type}`} /> : 
                <img src={mail} alt={`${type}`} /> 
            }
            <a href={isContactPhone? `tel:${contact}` : `mailto:${contact}`}>{contact}</a>
        </div>
    )
}