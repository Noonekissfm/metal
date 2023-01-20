import React, { FC } from 'react';
import { SubCategories } from 'src/models/menu';
import { getDescriptionData } from '../../utils/utils';
import { Backplate } from '../AppWrappers/Backplate';
import { Description } from './components/Description';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Image } from './components/Image';
import { Price } from './components/Price';

import style from './style.module.css';

interface IProps {
    data: SubCategories;
}

export const ItemCard: FC<IProps> = ({ data }) => {
    const description = !!data.description ? getDescriptionData(data.description) : null;
    return (
        <div className={style.itemCard}>
            <Header price={data.price} title={data.title} />
            <Backplate>
                <Footer>
                    <Description title={data.title} data={description} isImage={!!data.img_link} />
                    {!!data.img_link && <Image src={data.img_link} title={data.img_title} />}
                </Footer>
            </Backplate>
        </div>
    );
};
