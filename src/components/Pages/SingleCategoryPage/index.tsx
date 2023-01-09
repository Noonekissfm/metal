import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

interface IProps {
    data: any
}

export const SingleCategoryPage: FC<IProps> = ({data}) => {
    const {category} = useParams()
    
    const getData = (category: any) => {
        
        const d = data[`${category}`];
        const keys = Object.keys(d).map(item => {
            return {
                item,
                name: d[item]._meta?.title || d._meta?.title,
                subList: {
                    item: d[item],
                    title: Object.keys(d[item])
                    }
                }
        })
        return keys
    }

    return (
        <>{getData(category).map((item) => <li key={item.name}className="menu_item">{item.name}</li>)}</>
    )
}