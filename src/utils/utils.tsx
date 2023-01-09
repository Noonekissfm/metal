// Get sub Categories data
export const getSubCategories = (category: any, key: string) => {
    const keys = Object.keys(category[key]).filter((subKey) => subKey !== '_meta');

    return keys.map((subKey) => ({
        key: subKey,
        name: category[key][subKey]._meta.title,
    }));
};