import React, { FC } from 'react';
import { BackButton } from 'src/components/AppButtons/BackButton';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { useWindowDimensions } from 'src/hooks';

import style from './style.module.css';

interface IProps {
    keys: string[];
    titles: string[];
}

export const Navigation: FC<IProps> = ({keys, titles}) => {
    const { width } = useWindowDimensions();
    const isMobile = +width <= 767;
    return (
        <>
            {!isMobile?
            <div className={style['Breadcrumbs__wrapper']}>
                <Backplate width="fit-content">
                    <Breadcrumbs keys={keys} titles={titles} />
                </Backplate>
            </div> 
            :<BackButton primary={isMobile}/>}
        </>
    );
};
