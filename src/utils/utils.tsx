
// Get sub Categories data

interface IData {
    subCategory: {}[];
    key: string;
    title: string;
    img_link?: string;
    img_title?: string;
    description?: string;
    price?: string;
    menu_path: string[];
}

export const getRenderData = (keys: string[], data: any): IData => {
    const renderData = data[0]
    if(keys.length > 0) {
        let tempData = renderData
        for(let i = 1; i < keys.length; i++) {
            if(!!tempData) tempData = tempData.subCategory.filter((item: IData) => item.key === keys[i])[0]
        }
        return tempData
    }
    return renderData
}

interface IDescription {
    description: string[];
    wordsCount: number;
}

export const getDescriptionData = (description: string): IDescription => {
    const arr = [...description.split('\n').filter(item => item !== '')]
    const data = {
        description: arr,
        wordsCount: description.split(' ').length
    }
    return data
}

