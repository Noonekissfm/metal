import React, { FC } from 'react';
import { ShortMenu } from 'src/components/ShortMenu';
import { Banner } from 'src/components/Banner';
import { AppTitle } from 'src/components/AppTitle';
import { Description } from './components/Description';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';
import { Label } from './components/Label';

import shortMenuData from 'src/data/shortMenuData.json';
import newsData from 'src/data/newsData.json'
import company from 'src/data/company.json';
import banner from 'src/assets/company/wall1.jpg';
import style from './style.module.css';
import { Slider } from './components/Slider';

interface IProps {}

export const HomePage: FC<IProps> = () => {
    return (
        <section className={style.homepage}>
            <Label />
            <Banner image_link={banner} alt="matalloprokat" />
            <ContentWrapper>
                <div className={style.content}>
                    <AppTitle title={company.name} />
                    <Description text={company.legend} />
                    <div className={style.page_row}>
                        <ShortMenu data={shortMenuData} />
                        <Slider newsArray={newsData}/>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    );
};
