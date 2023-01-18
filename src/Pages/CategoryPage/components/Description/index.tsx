import React, { FC } from 'react';
import { getDescriptionData } from 'src/utils/utils';

import style from './style.module.css';

interface IProps {
    description: string | undefined;
}

export const Description: FC<IProps> = ({ description }) => {
    const descriptionData = description && getDescriptionData(description);
    return (
        <>
            {descriptionData && <div className={style.description_section}>
                {descriptionData.description.length > 0 &&
                    descriptionData.description.map((item, index) => <p key={`${item}-${index}`}>{item}</p>)}
            </div>}
        </>
    );
};
