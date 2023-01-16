import React, { FC } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './style.css';

interface IProps {
    title: string;
}
export const YandexMap: FC<IProps> = ({ title }) => {
    const defaultState = { center: [59.897262, 30.482542], zoom: 13 };

    return (
        <YMaps>
            <Map defaultState={defaultState} height={'35vh'} width={'100%'}>
                    <Placemark
                        geometry={[59.888848, 30.482479]}
                        options={{ preset: 'islands#blackStretchyIcon' }}
                        properties={{ iconContent: title }}
                    />
            </Map>
        </YMaps>
    );
};
