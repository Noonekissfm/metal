export const getColumns = (data: {}[]) => {
    const slicedArr = []
    for(let i = 0; i < data.length; i+=3) {
        
        slicedArr.push(data.slice(i, i+3))
    }
    return slicedArr
}