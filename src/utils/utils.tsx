
// Get sub Categories data
export const getRenderData = (keys: string[], data: any) => {
    const renderData = data[0]
    if(keys && keys.length > 0) {
        let tempData = renderData
        for(let i = 1; i < keys.length; i++) {
            if(!!tempData) tempData = tempData.subCategory.filter((item: any) => item.key === keys[i])[0]
        }
        return !!tempData? tempData : false
    }
    return renderData
}

export const getDescription = (description: string) => {
    const arr = [...description.split('\n').filter(item => item !== '')]
    const data = {
        description: arr,
        wordsCount: description.split(' ').length
    }
    return data
}

