import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { SubList } from '../../SubList'

interface IProps {
    data: any
}

export const CategoryPage: FC<IProps> = ({data}) => {
    const {category, subCategory} = useParams()
    
    const getData = (category: any, subCategory: any) => {
        
        const d = subCategory? data[`${category}`][`${subCategory}`] : data[`${category}`];
        const keys = Object.keys(d).filter(item => item !== '_meta').map((item) => {
            return {
                item,
                name: d[item]._meta?.title || d._meta?.title,
                subList: {
                    item: Object.values(d[item]),
                    key: Object.keys(d[item]).filter(key => key !== '_meta'),
                    }
                }
        })
        return keys
    }

    const renderData = getData(category, subCategory);
    const subListData = renderData.map(item => item.subList.item)

    const sorted = subListData.map(item => Object.values(item).filter((key: any) => key !== '_meta').map((item: any) => item?._meta?.title))
    console.log(sorted)
    

    return (
        <>{renderData.map((item, index) => (
            <div className='wrapper'>
                <SubList data={sorted} index={index} sublistTitle={item.name}/>
            </div>
        ))}</>
    )
}