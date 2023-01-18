interface ILinks {
    key: string;
    title: string;
    _link: string;
}

export const getLinksObject = (arrKeys: string[], arrHeaders: string[]): Array<ILinks> => {
    let tempLink = '';

    const obj = arrKeys.map((item, index) => {
        return {
            key: item === 'index'? 'catalog' : item,
            title: item === 'index'? 'Каталог продукции' : arrHeaders[index],
            _link: tempLink += '/' + (item === 'index'? 'catalog' : item)
        }
    })
    return obj
}