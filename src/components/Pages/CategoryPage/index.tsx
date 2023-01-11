import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getRenderData } from '../../../utils/utils'
import { Breadcrumbs } from '../../Breadcrumbs'
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

    const description = renderData.description? renderData.description.split('.').filter((item: any) => item !== '') : null
    console.log(keys)
    return (
        <div className='wrapper'>
            {keys.length > 0 && <Breadcrumbs keys={keys} titles={renderData.menu_path} />}
            {subCategory ? renderData.subCategory.map((item: any) => <Category categoryKey={item.key} title={item.title} key={item.key} />) : <ItemCard data={renderData}/>}
            {description && <div className='desription_section margin-top-30'>{description.length > 0 && description.map((item: any) => <p>{item}</p>)}</div>}
        </div>
    )
}