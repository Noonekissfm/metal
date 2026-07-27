import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';
import company from 'src/data/company.json';
import banner from 'src/assets/company/wall1.jpg';

import style from './style.module.css';

interface IProps {
    onRequestCall: () => void;
}

/** Раньше первым экраном была фотография с полупрозрачной плашкой-логотипом,
 *  поставленной абсолютно на top: 10vh; left: 20vw поверх пёстрого металла:
 *  ни названия, ни того, чем занимается компания, ни куда нажимать. */
export const Hero: FC<IProps> = ({ onRequestCall }) => {
    return (
        <section className={style.hero}>
            <img
                className={style.image}
                src={banner}
                alt=""
                width={1080}
                height={584}
                loading="eager"
                decoding="async"
            />
            <div className={style.scrim} />

            <ContentWrapper>
                <div className={style.content}>
                    <p className={style.company}>{company.name}</p>
                    <h1 className={style.title}>
                        Металлопрокат и метизы со склада в Санкт-Петербурге
                    </h1>
                    <p className={style.subtitle}>
                        Чёрный, нержавеющий и цветной прокат, спецстали. Своя доставка, резка
                        в размер, отгрузка по всей России.
                    </p>

                    <div className={style.actions}>
                        <Link className={style.primary} to="/catalog">
                            Перейти в каталог
                        </Link>
                        <button type="button" className={style.secondary} onClick={onRequestCall}>
                            Заказать звонок
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
};
