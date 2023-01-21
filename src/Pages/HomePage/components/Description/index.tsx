import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    text: string[];
}

export const Description: FC<IProps> = ({text}) => {
    return (
        <div className={style.description}>
            {text.map(p => <p key={p}>{p}</p>)}
        </div>
    )
}