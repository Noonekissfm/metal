import React, { FC, useState } from 'react';
import style from './style.module.css';

interface IProps {
    /** Готовый адрес: файл из CMS или картинка из /public. */
    src: string | null;
    title: string | null;
}

export const Image: FC<IProps> = ({ src, title }) => {
    const [isBroken, setIsBroken] = useState(false);

    // Раньше здесь был require(`src/${src}`), который падал на отсутствующем
    // файле и ронял всю страницу. Теперь недостающая картинка просто не видна.
    if (!src || isBroken) return null;

    return (
        <div className={style.wrapper}>
            <img src={src} alt={title || ''} loading="lazy" onError={() => setIsBroken(true)} />
        </div>
    );
};
