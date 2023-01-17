import React, { FC, useMemo } from 'react'
import { BackButton } from 'src/components/AppButtons/BackButton'

import { Breadcrumbs } from 'src/components/Breadcrumbs'
import { Category } from 'src/components/Category'
import { ItemCard } from 'src/components/ItemCard'

import { useUrlParams, useWindowDimensions } from 'src/hooks'
import { getRenderData } from 'src/utils/utils'
import { Catalog } from '../Catalog'
import { NotFoundPage } from '../NotFoundPage'

import './style.css'
import { sortData } from './utils'

interface IProps {
    data: {
        key: string;
        subCategory: {}[];
        title: string
    }[],
}

export const CategoryPageV2: FC<IProps> = ({data}) => {
    const keys = useUrlParams()
    const isKeysMoreThanOne = keys.length > 0

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
            {/* {!!renderData ? <div className='wrapper'>
            <div className="category">
                <Breadcrumbs keys={keys} titles={renderData.menu_path} />
                {data.map(item => <Catalog key={item.key} data={item.subCategory} />)}
            </div>
        </div>
        : <NotFoundPage />} */}
        </>
    )
}