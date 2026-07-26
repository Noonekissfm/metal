import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoSVG } from 'src/assets/company/logo.svg';
import company from 'src/data/company.json';

import style from './style.module.css';

export const Logo: FC = () => {
    return (
        <div className={style.logo}>
            {/* Внутри ссылки только svg, поэтому имя нужно задать явно:
              * иначе скринридер читает её просто как «ссылка». */}
            <Link to="/" aria-label={`${company.name} — на главную`}>
                <LogoSVG aria-hidden="true" />
            </Link>
        </div>
    );
};
