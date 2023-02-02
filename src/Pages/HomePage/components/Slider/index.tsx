import React, { FC } from 'react';

import style from './style.module.css';

import { Backplate } from 'src/components/AppWrappers/Backplate';
import SlickSlider from 'react-slick';

import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';
import './slick-over-write.css';

interface IProps {}

export const Slider: FC<IProps> = () => {
    return (
        <div className={style.slider_wrapper}>
            <Backplate>
                <SlickSlider dots className={style.slider_slide}>
                    <div>
                        <div className={style.newsItem_header}><h3>Мы открылись!</h3><span>09.01</span></div>
                        <p>День, когда ООО «МЕТ-С» открылся.</p>
                    </div>
                    <div>
                        <div className={style.newsItem_header}><h3>Новые поставки</h3><span>02.02</span></div>
                        <p>Осуществляем поставки медных и свинцовых листов размером 1000х2000мм российского производства.</p>
                    </div>
                </SlickSlider>
            </Backplate>
        </div>
    );
};
