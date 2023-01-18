import React, { FC } from 'react';
import { getDescriptionData } from '../../utils/utils';
import { Backplate } from '../AppWrappers/Backplate';
import { Description } from './components/Description';
import { Footer } from './components/Footer';
import { Image } from './components/Image';
import { Price } from './components/Price';

import style from './style.module.css';

interface IProps {
    data: {
        title: string;
        price?: string | undefined;
        description?: string | undefined;
        img_link?: string | undefined;
        img_title?: string | undefined;
        subCategory?: {}[];
    }
}

export const ItemCard: FC<IProps> = ({ data }) => {
    const description = !!data.description ? getDescriptionData(data.description) : null;
    return (
        <div className={style.itemCard}>
            <div className={style.itemCard__head}>
                <p>{data.title}</p>
                <Price price={data.price} />
            </div>
            <Backplate>
                <Footer>
                    <Description title={data.title} data={description} isImage={!!data.img_link}/>
                    {!!data.img_link && <Image src={data.img_link} title={data.img_title} />}
                </Footer>
            </Backplate>
        </div>
    );
};
