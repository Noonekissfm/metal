import React, { FC } from 'react';

import { resolveImageUrl } from 'src/api/catalog';
import { useCatalog } from 'src/context/CatalogContext';
import { Product } from 'src/models/catalog';
import { useLayoutContext } from 'src/Pages/Layout/outletContext';

import { getDescriptionData } from '../../utils/utils';
import { Description } from './components/Description';
import { Image } from './components/Image';
import { Price } from './components/Price';
import { Terms } from './components/Terms';

import style from './style.module.css';

interface IProps {
    product: Product;
}

export const ItemCard: FC<IProps> = ({ product }) => {
    const { getEffectivePrice } = useCatalog();
    const { onRequestCall } = useLayoutContext();

    const description = product.description ? getDescriptionData(product.description) : null;
    const imageUrl = resolveImageUrl(product);
    const unitPrice = getEffectivePrice(product);

    return (
        <article className={style.card}>
            {/* Слева картинка, справа название, цена и заказ. Раньше карточка
              * была высотой в 340px под две строки описания и в основном
              * пустая, а цена стояла мелким текстом над названием. */}
            <div className={style.main}>
                {!!imageUrl && (
                    <div className={style.media}>
                        <Image src={imageUrl} title={product.image_title} />
                    </div>
                )}

                <div className={style.details}>
                    <h1 className={style.title}>{product.title}</h1>

                    <Price
                        unitPrice={unitPrice}
                        itemKey={product.key}
                        title={product.title}
                        menuPath={product.menu_path || []}
                        onRequestCall={onRequestCall}
                    />

                    <Terms />
                </div>
            </div>

            <Description title={product.title} data={description} />
        </article>
    );
};
