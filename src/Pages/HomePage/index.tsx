import React, { FC } from 'react';

import { ShortMenu } from 'src/components/ShortMenu';
import { AppTitle } from 'src/components/AppTitle';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';

import { useLayoutContext } from 'src/Pages/Layout/outletContext';

import { Description } from './components/Description';
import { Hero } from './components/Hero';
import { News } from './components/News';

import shortMenuData from 'src/data/shortMenuData.json';
import newsData from 'src/data/newsData.json';
import company from 'src/data/company.json';

import style from './style.module.css';

export const HomePage: FC = () => {
    const { onRequestCall } = useLayoutContext();

    return (
        <>
            {/* h1 живёт в Hero: он же и есть главный заголовок страницы. */}
            <Hero onRequestCall={onRequestCall} />

            <ContentWrapper>
                <div className={style.content}>
                    <section>
                        <AppTitle title="Каталог продукции" borderless />
                        <ShortMenu data={shortMenuData} />
                    </section>

                    <News news={newsData} />

                    <section>
                        <AppTitle title={company.name} />
                        <Description text={company.legend} />
                    </section>
                </div>
            </ContentWrapper>
        </>
    );
};
