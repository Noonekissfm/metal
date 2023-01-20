import React, { FC } from 'react';
import { AppTitle } from 'src/components/AppTitle';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { IPersonCard, PersonCard } from './PersonCard';

import style from './style.module.css';

interface IProps {
    data: IPersonCard[];
}

export const Team: FC<IProps> = ({ data }) => {
    return (
        <div className={style.OurTeam}>
            <span className={style.title_wrapper}>
                <AppTitle title="Наша команда" />
            </span>
            <div className={style.teammates}>
                {data.map((item, index) => (
                    <PersonCard key={`person-${index}`} data={item} />
                ))}
            </div>
        </div>
    );
};
