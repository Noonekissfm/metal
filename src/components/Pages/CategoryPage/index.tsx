import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getRenderData } from '../../../utils/utils'
import { Category } from '../../Category'
import { ItemCard } from '../../ItemCard'

interface IProps {
    data: any,
}

export const CategoryPage: FC<IProps> = ({data}) => {
    const keys = Object.values(useParams())

    const renderData = useMemo(()=>{
        return getRenderData(keys, data);
    },[data, keys])

    const subCategory = renderData.subCategory.length > 0;

    return (
        <div className='wrapper'>
            {subCategory ? renderData.subCategory.map((item: any) => <Category categoryKey={item.key} title={item.title} key={item.key} />) : <ItemCard data={renderData}/>}
        </div>
    )
}