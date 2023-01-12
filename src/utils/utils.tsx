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

export const getDescriptionData = (data: string) => {
    return data.split('.').filter((item: any) => item !== '')
}

export const getLinksObject = (arrKeys: string[], arrHeaders: string[]) => {
    let tempLink = '/index'
    const obj = arrKeys.map((item: any, index: number) => {
        console.log(arrHeaders)
        return {
            key: item,
            title: arrHeaders[index + 1],
            _link: tempLink += '/' + item
        }
    })
    return obj
}