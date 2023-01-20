import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    image_link: string;
    alt: string;
}

export const Banner: FC<IProps> = ({image_link, alt}) => {
    return (
        <div className={style.banner_wrapper}>
            <img src={image_link} alt={alt} />
        </div>
    );
};
