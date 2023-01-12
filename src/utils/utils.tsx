import { useParams } from "react-router-dom"

// Get sub Categories data
export const getRenderData = (keys: any, data: any) => {
    const renderData = data[0]
    if(keys && keys.length > 0) {
        let tempData = renderData
        for(let i = 1; i < keys.length; i++) {
            tempData = tempData.subCategory.filter((item: any) => item.key === keys[i])[0]
        }
        return tempData
    }
    return renderData
}

export const getDescriptionData = (data: string) => {
    return data.split('.').filter((item: any) => item !== '')
}

export const getLinksObject = (arrKeys: string[], arrHeaders: string[]) => {
    let tempLink = '';

    const obj = arrKeys.map((item: any, index: number) => {
        return {
            key: item,
            title: item === 'index'? 'Каталог продукции' : arrHeaders[index],
            _link: tempLink += '/' + item
        }
    })
    return obj
}

export const useKeysFromParams = () => {
    const keys = Object.values(useParams())
    if(keys[0] !== 'index') {
        keys.unshift('index')
    }
    return keys
}