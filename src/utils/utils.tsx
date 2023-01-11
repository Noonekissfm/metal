// Get sub Categories data
export const getRenderData = (keys: any, data: any) => {
    const renderData = data[0]
    if(keys && keys.length > 0) {
        let tempData = renderData
        for(let i = 0; i < keys.length; i++) {
            tempData = tempData.subCategory.filter((item: any) => item.key === keys[i])[0]
        }
        return tempData
    }
    return renderData
}