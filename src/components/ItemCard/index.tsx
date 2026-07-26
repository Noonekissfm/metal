import React, { FC } from 'react';

import { resolveImageUrl } from 'src/api/catalog';
import { useCatalog } from 'src/context/CatalogContext';
import { Product } from 'src/models/catalog';

import { getDescriptionData } from '../../utils/utils';
import { Backplate } from '../AppWrappers/Backplate';
import { Description } from './components/Description';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Image } from './components/Image';

import style from './style.module.css';

interface IProps {
    product: Product;
}

export const ItemCard: FC<IProps> = ({ product }) => {
    const { getEffectivePrice } = useCatalog();

    const description = product.description ? getDescriptionData(product.description) : null;
    const imageUrl = resolveImageUrl(product);
    const unitPrice = getEffectivePrice(product);

    return (
        <div className={style.itemCard}>
            <Header
                title={product.title}
                unitPrice={unitPrice}
                itemKey={product.key}
                menuPath={product.menu_path || []}
            />
            <Backplate>
                <Footer>
                    <Description title={product.title} data={description} isImage={!!imageUrl} />
                    {!!imageUrl && <Image src={imageUrl} title={product.image_title} />}
                </Footer>
            </Backplate>
        </div>
    );
};
