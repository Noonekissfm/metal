import React, { FC } from 'react';
import { MailLink } from './MailLink';
import { PhoneLink } from './PhoneLink';
import { WorkTime } from './WorkTime';

import style from './style.module.css'

interface IProps {
    phone?: boolean,
    mail?: boolean,
    workTime?: boolean,
}

export const Contacts: FC<IProps> = ({phone, mail, workTime}) => {

    return (
        <div className={style.wrapper}>
            {phone && <PhoneLink icon />}
            {mail && <MailLink icon />}
            {workTime && <WorkTime icon />}
        </div>
    );
};
