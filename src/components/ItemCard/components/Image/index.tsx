import React, { FC } from 'react';
import style from './style.module.css';

interface IProps {
    src: string | undefined;
    title: string | undefined;
}

export const Image: FC<IProps> = ({ src, title }) => {
    return (
        <div className={style.wrapper}>
            <img src={require(`src/${src}`)} alt={title} />
        </div>
    );
};
