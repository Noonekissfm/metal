import React, { FC } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './style.css';

interface IProps {
    title: string;
}
export const YandexMap: FC<IProps> = ({ title }) => {
    const coordinates = {
        focusOnOffice: [59.888848, 30.482479],
        focusOnCenterBetweenMetroAndOffice: [59.897262, 30.482542],
        companyOffice: [59.888848, 30.482479]
    }
    const defaultState = { center: coordinates.focusOnOffice, zoom: 13 };
    const styleList = {
        height: '35vh',
        minHeight: '150px',
        width: '100%'
    }
    return (
        <YMaps>
            <Map defaultState={defaultState} style={styleList}>
                    <Placemark
                        geometry={coordinates.companyOffice}
                        options={{ preset: 'islands#blackStretchyIcon' }}
                        properties={{ iconContent: title }}
                    />
            </Map>
        </YMaps>
    );
};
