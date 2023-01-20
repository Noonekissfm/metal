import React, { FC } from 'react';
import { ContentWrapper } from '../AppWrappers/ContentWrapper';

import style from './style.module.css';

interface IProps {
    children: any,
}

export const Header: FC<IProps> = ({children}) => {
    return (
        <section className={style.section}>
            <ContentWrapper>
                <div className={style.wrapper}>
                    {children}
                </div>
            </ContentWrapper>
        </section>
    );
};