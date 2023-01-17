import React, { FC, useMemo } from 'react'
import { BackButton } from 'src/components/AppButtons/BackButton'
import { Backplate } from 'src/components/Backplate'

import { Breadcrumbs } from 'src/components/Breadcrumbs'
import { Category } from 'src/components/Category'
import { ItemCard } from 'src/components/ItemCard'

import { useUrlParams, useWindowDimensions } from 'src/hooks'
import { getDescription, getRenderData } from 'src/utils/utils'
import { NotFoundPage } from '../NotFoundPage'

import { sortData } from './utils'
import style from './style.module.css';
import { data } from 'src/types/interfaces'



export const CategoryPage: FC<data> = ({data}) => {
    const keys = useUrlParams()

    const { width } = useWindowDimensions()
    const isMobile = +width <= 767

    const renderData = useMemo(()=>{
        return getRenderData(keys, data);
    },[data, keys])

    let subCategory, description;

    if(!!renderData) {
        subCategory = renderData.subCategory.length > 0;
        description = renderData.description? getDescription(renderData.description) : null
    }
    
    return (
        <>
            {!!renderData ? <div className={style.wrapper}>
            <div className={style.category}>
                {!isMobile && <div className={style['Breadcrumbs__wrapper']}>
                    <Backplate width='fit-content'>
                        {keys.length > 0 ? <Breadcrumbs keys={keys} titles={renderData.menu_path} /> : <Breadcrumbs keys={['catalog']} titles={['Каталог продукции']} />}
                    </Backplate>
                </div>}
                {isMobile && <BackButton primary/>}
                {subCategory ? <div className={style['menu_item_wrapper']}>{sortData(renderData.subCategory, 'title').map((item: {title: string, key: string} ) => item.title && <Category categoryKey={item.key} title={item.title} key={item.key} />)}</div> : <ItemCard data={renderData}/>}
                {description?.description && subCategory && <div className={style.description_section}>{description.description.length > 0 && description.description.map((item: string, index) => <p key={`${item}-${index}`}>{item}</p>)}</div>}
            </div>
        </div>
        : <NotFoundPage />}
        </>
    )
}