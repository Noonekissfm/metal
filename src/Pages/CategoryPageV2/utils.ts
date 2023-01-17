export const sortData = (data: any, key: string) => {
    let result = data.sort((a: any, b: any) => {
        if(a[key] < b[key]) {
            return -1
        }
    });
    return result
}