import React, { FC } from 'react';
import { Copyrights } from './components/Copyrights/Copyrights';
import { InfoGroup } from './components/InfoGroup';

import style from './style.module.css';

interface IProps {
}

export const Footer: FC<IProps> = () => {
    return (
        <footer className={style.footer}>
            <InfoGroup />
            <Copyrights />
        </footer>
    )
}