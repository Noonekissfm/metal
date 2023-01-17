import React, { FC } from 'react';
import { MAX_WORDS_COUNT } from 'src/types/constants';

import style from './style.module.css';

interface IProps {
    data: {
        description: string[];
        wordsCount: number;
    } | null;
    title: string;
    isImage: boolean;
}

export const Description: FC<IProps> = ({ data, title, isImage }) => {
    const isBigDescription = data && data.wordsCount >= MAX_WORDS_COUNT
    
    const descriptionClassList = ['description', isBigDescription? '--long' : ''].join('')
    const wrapperClassList = ['wrapper', isImage? '' : '--noimg'].join('')
    
    return (
        <div className={style[wrapperClassList]}>
            <p className={style.description_header}>Описание</p>
            <div className={style[descriptionClassList]}>
                {data && !!data.description && data.description.map((item: string, index: number) => (
                    <p key={`${item}-${index}`}>
                        {item}
                    </p>))}

                {!data && <>
                    <p>{title} - купить в Компании ООО «МЕТ-С»</p>
                    <p>Качество продаваемой нами продукции 100%</p>
                    <p>Вся продукция имеет заводские сертификаты</p>
                </>}
            </div>
        </div>
    );
};
