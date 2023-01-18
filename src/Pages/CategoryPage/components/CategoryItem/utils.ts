export const sortData = (data: any, key: string) => {
    // eslint-disable-next-line array-callback-return
    let result = data.sort((a: any, b: any) => {
        if(a[key] < b[key]) {
            return -1
        }
    });
    return result
}