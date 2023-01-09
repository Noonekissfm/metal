import React, { FC, useState } from 'react'

interface IProps {
    data: any,
    index: number,
    sublistTitle: string
}

export const SubList: FC<IProps> = ({data, index, sublistTitle}) => {

    const [show, setShow] = useState(false);

    return (
        <>
            <li 
                key={sublistTitle} 
                className="menu_item"
                onClick={()=>setShow(!show)}
            >{sublistTitle}</li>
            {show && data[index].map((item: any) => !!item && <li key={item} className="submenu_item">{item}</li>)}
        </>
    )
}