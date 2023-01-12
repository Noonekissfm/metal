import React, { FC } from 'react';
import './style.css'

interface IProps {
    data: string[],
    primary: boolean
}

export const ItemDescription: FC<IProps> = ({ data, primary }) => {
    return (
        <>
            {!primary && <p className="ItemDescription__header">Описание</p>}
            <div className={`ItemDescription__wrapper--${primary? 'primary' : 'secondary'}`}>
                {data.map((item: string, index: number) => (
                    <p key={item + '-' + index}>{item}</p>
                ))}
            </div>
        </>
    );
};
