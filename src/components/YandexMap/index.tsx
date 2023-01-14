import React, { FC } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './style.css';


interface IProps {}
export const YandexMap: FC<IProps> = () => {
    const defaultState = {center: [59.888848, 30.482479], zoom: 14}
    
    return (
        <YMaps>
           <div className="YMWrapper">
            <Map
                defaultState={defaultState} 
                height={'35vh'}
                width={'100%'}
            >
                <Placemark geometry={[59.888848, 30.482479]} />
            </Map>
           </div>
        </YMaps>
    )
}