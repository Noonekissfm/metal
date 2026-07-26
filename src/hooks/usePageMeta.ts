import { useEffect } from 'react';

import company from 'src/data/company.json';

const SUFFIX = 'МЕТ-С | Металлопрокат СПб';
const DEFAULT_DESCRIPTION = `Металлопрокат и метизы со склада в Санкт-Петербурге. Чёрный, нержавеющий и цветной прокат, спецстали. ${company.phone}`;

const setDescription = (text: string) => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'description';
        document.head.appendChild(tag);
    }

    tag.content = text;
};

interface Meta {
    /** Без суффикса: он добавляется сам. */
    title?: string;
    description?: string;
}

/** Заголовок и описание страницы. На все 9000 товаров в index.html был
 *  один <title> и одно описание.
 *
 *  Оговорка: сайт рисуется на клиенте, поэтому поисковик, не исполняющий
 *  JS, ничего этого не увидит. Яндекс — основной здесь — JS исполняет. */
export const usePageMeta = ({ title, description }: Meta) => {
    useEffect(() => {
        document.title = title ? `${title} — ${SUFFIX}` : SUFFIX;
        setDescription(description || DEFAULT_DESCRIPTION);
    }, [title, description]);
};
