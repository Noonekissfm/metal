import React, { FC, useRef, useState } from 'react';
import './style.css';

import { TCategory } from '../../models/menu';
import { Link } from 'react-router-dom';

interface IProps {
    data: TCategory;
}

export const Category: FC<IProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const catalogRef = useRef<HTMLLIElement>(null);
    const _width = catalogRef.current?.offsetWidth

    const handleMouseEnter = (multilevel: boolean) => {
        multilevel? setShow(true): setShow(false)
    };

    const handleMouseLeave = () => {
        setShow(false);
    };

    return (
        <>
            <li 
            ref={catalogRef}
            className="menu_item" 
            onMouseEnter={()=>{handleMouseEnter(data.multilevel)}} 
            onMouseLeave={handleMouseLeave}
            >
                {!data.multilevel? <Link to={`${data.key}`}>{data.name}</Link> : data.name}
                {show && !!data.subCategories && (
                    <ul className="subCategory" style={{left: `${_width}px`}}>
                        {data.subCategories.map((item) => (
                            <li key={item.key} className="menu_item">
                                <Link to={`${data.key}/${item.key}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </>
    );
};
