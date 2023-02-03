import React, { FC } from 'react';

import style from './style.module.css';

import SlickSlider from 'react-slick';

import '../../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../../node_modules/slick-carousel/slick/slick-theme.css';
import './slick-over-write.css';
import { INews, NewsItem } from './NewsItem';

interface IProps {
    newsArray: INews[];
}

export const Slider: FC<IProps> = ({ newsArray }) => {
    return (
        <div className={style.slider_wrapper}>
            <SlickSlider dots className={style.slider_slide} adaptiveHeight>
                {newsArray.map((news) => (
                    <NewsItem key={news._id} title={news.title} body={news.body} />
                ))}
            </SlickSlider>
        </div>
    );
};
