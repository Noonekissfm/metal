import React, { FC } from 'react';

import style from './style.module.css';

interface IProps {
    image_link: string;
    alt: string;
    /** Размеры исходника — чтобы страница не прыгала, пока картинка грузится. */
    width?: number;
    height?: number;
}

export const Banner: FC<IProps> = ({ image_link, alt, width = 1080, height = 584 }) => {
    return (
        <div className={style.banner_wrapper}>
            {/* Баннер — первое, что видно на экране, поэтому грузим его сразу,
              * а не lazy: отложенная загрузка здесь только замедлит показ. */}
            <img
                src={image_link}
                alt={alt}
                width={width}
                height={height}
                loading="eager"
                decoding="async"
            />
        </div>
    );
};
