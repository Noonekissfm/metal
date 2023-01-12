import React, { FC } from 'react';
import './style.css';

interface IProps {
    src: string,
    title: string,
    primary: boolean,
}

export const ItemImg: FC<IProps> = ({ src, title, primary }) => {
    return (
        <div className={`ItemImg__wrapper--${primary? 'primary' : 'secondary'}`}>
            <img className="ItemImg__img" src={require(`../../../${src}`)} alt={title} />
        </div>
    );
};
