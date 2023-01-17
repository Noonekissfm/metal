export interface data {
    [key: string]: {
        subCategory: {}[];
        key: string;
        title: string;
        img_link?: string;
        img_title?: string;
        description?: string;
        price?: string;
        menu_path?: string[];
    }[]
}