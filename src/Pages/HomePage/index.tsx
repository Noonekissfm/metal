import React, { FC, useEffect, useState } from 'react';

import { ShortMenu } from 'src/components/ShortMenu';
import { AppTitle } from 'src/components/AppTitle';
import { ContentWrapper } from 'src/components/AppWrappers/ContentWrapper';

import { fetchNews } from 'src/api/catalog';
import { NewsItem } from 'src/models/catalog';
import { usePageMeta } from 'src/hooks';
import { useLayoutContext } from 'src/Pages/Layout/outletContext';

import { Description } from './components/Description';
import { Hero } from './components/Hero';
import { News } from './components/News';

import shortMenuData from 'src/data/shortMenuData.json';
import company from 'src/data/company.json';

import style from './style.module.css';

export const HomePage: FC = () => {
    const { onRequestCall } = useLayoutContext();
    const [news, setNews] = useState<NewsItem[]>([]);

    // У главной заголовок без приставки — она и так про компанию целиком.
    usePageMeta({});

    // Новости живут в PocketBase. Если они не загрузились, блок просто
    // не показывается — остальная главная от этого не зависит.
    useEffect(() => {
        let cancelled = false;

        fetchNews()
            .then((items) => {
                if (!cancelled) setNews(items);
            })
            .catch(() => undefined);

        return () => {
            cancelled = true;
        };
    }, []);

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

                    <News news={news} />

                    <section>
                        <AppTitle title={company.name} />
                        <Description text={company.legend} />
                    </section>
                </div>
            </ContentWrapper>
        </>
    );
};
