import React, { FC } from 'react';
import { AppTitle } from 'src/components/AppTitle';
import { getDescriptionData } from 'src/utils/utils';

import style from './style.module.css';

interface IProps {
    description: string | null;
    title: string;
}

export const Description: FC<IProps> = ({ description, title }) => {
    const descriptionData = description && getDescriptionData(description);
    return (
        <>
            {descriptionData && 
            <div className={style.description_section}>
                <span className={style.title_wrapper}><AppTitle title={title} /></span>
                <div className={style.description}>
                    {descriptionData.description.length > 0 &&
                        descriptionData.description.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
                </div>
            </div>}
        </>
    );
};
