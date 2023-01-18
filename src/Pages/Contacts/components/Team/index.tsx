import React, { FC } from 'react';
import { AppTitle } from 'src/components/AppTitle';
import { Backplate } from 'src/components/AppWrappers/Backplate';
import { IPersonCard, PersonCard } from './PersonCard';

import style from './style.module.css';

interface IProps {
    data: {
        [team: string]: IPersonCard[];
    };
}

export const Team: FC<IProps> = ({ data }) => {
    return (
        <div className={style.OurTeam}>
            <AppTitle title="Наша команда" />
            <div className={style.teammates}>
                {data.team.map((item, index) => (
                    <Backplate>
                        <PersonCard key={`person-${index}`} data={item} />
                    </Backplate>
                ))}
            </div>
        </div>
    );
};
