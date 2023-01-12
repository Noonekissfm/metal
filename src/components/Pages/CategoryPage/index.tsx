import React, { FC, useMemo } from 'react'
import { getRenderData, useKeysFromParams } from '../../../utils/utils'
import { Breadcrumbs } from '../../Breadcrumbs'
import { Category } from '../../Category'
import { ItemCard } from '../../ItemCard'

import './style.css'

interface IProps {
    data: {},
}

export const CategoryPage: FC<IProps> = ({data}) => {
    const keys = useKeysFromParams()

    const renderData = useMemo(()=>{
        return getRenderData(keys, data);
    },[data, keys])

    const subCategory = renderData.subCategory.length > 0;

    const description = renderData.description? renderData.description.split('.').filter((item: any) => item !== '') : null
    return (
        <div className='wrapper'>
            <div className="category">
                {keys.length > 0 ? <Breadcrumbs keys={keys} titles={renderData.menu_path} /> : <Breadcrumbs keys={['index']} titles={['Каталог продукции']} />}
                {subCategory ? renderData.subCategory.map((item: any) => <Category categoryKey={item.key} title={item.title} key={item.key} />) : <ItemCard data={renderData}/>}
                {description && !!subCategory && <div className='description_section margin-top-30'>{description.length > 0 && description.map((item: any, index: number) => <p key={item + '-' + index}>{item}</p>)}</div>}
            </div>
        </div>
    )
}