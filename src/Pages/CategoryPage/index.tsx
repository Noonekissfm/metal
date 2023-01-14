import React, { FC, useMemo } from 'react'
import { BackButton } from 'src/components/AppButtons/BackButton'

import { Breadcrumbs } from 'src/components/Breadcrumbs'
import { Category } from 'src/components/Category'
import { ItemCard } from 'src/components/ItemCard'

import { useUrlParams, useWindowDimensions } from 'src/hooks'
import { getRenderData } from 'src/utils/utils'
import { NotFoundPage } from '../NotFoundPage'

import './style.css'
import { sortData } from './utils'

interface IProps {
    data: {},
}

export const CategoryPage: FC<IProps> = ({data}) => {
    const keys = useUrlParams()

    const { width } = useWindowDimensions()
    const isMobile = +width <= 767

    const renderData = useMemo(()=>{
        return getRenderData(keys, data);
    },[data, keys])

    let subCategory, description;

    if(!!renderData) {
        subCategory = renderData.subCategory.length > 0;
        description = renderData.description? renderData.description.split('.').filter((item: any) => item !== '') : null
    }
    
    return (
        <>
            {!!renderData ? <div className='wrapper'>
            <div className="category">
                {keys.length > 0 ? <Breadcrumbs keys={keys} titles={renderData.menu_path} /> : <Breadcrumbs keys={['catalog']} titles={['Каталог продукции']} />}
                {isMobile && <BackButton primary/>}
                {subCategory ? <div className='menu_item_wrapper'>{sortData(renderData.subCategory, 'title').map((item: any) => <Category categoryKey={item.key} title={item.title} key={item.key} />)}</div> : <ItemCard data={renderData}/>}
                {description && !!subCategory && <div className='description_section'>{description.length > 0 && description.map((item: any, index: number) => <p key={item + '-' + index}>{item}</p>)}</div>}
            </div>
        </div>
        : <NotFoundPage />}
        </>
    )
}