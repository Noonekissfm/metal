import React, { FC, useState } from 'react';

interface IProps {
    data: any;
}

export const ToggleList: FC<IProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const clickHandler = () => {
        setShow(!show);
    };

    const keys = data.subList.keys.filter((key: string) => key !== '_meta');
    

    return (
        <div key={data.name} onClick={clickHandler}>
            <ul onClick={() => setShow(!show)} className="menu_item_header">{data.name}
                {show && keys.map((key: string) => (<li key={key} className="menu_item">{data.subList.items[key]?._meta?.title}</li>))}
            </ul>
        </div>
    )

};
