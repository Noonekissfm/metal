/** Модель каталога после переезда в PocketBase.
 *  Ключи (`key`) и `menu_path` те же, что были в data.json,
 *  поэтому все старые адреса /catalog/a/b/c продолжают работать. */

export interface Category {
    id: string;
    key: string;
    title: string;
    parent: string;
    /** В дереве не приходит — грузится для открытой страницы. */
    description?: string;
    menu_path: string[];
    sort_order: number;
    base_price: number | null;
}

export interface CategoryNode extends Category {
    children: CategoryNode[];
}

export interface Product {
    id: string;
    key: string;
    title: string;
    category: string;
    description: string;
    price: number | null;
    /** Загруженная сотрудником картинка. */
    image: string;
    /** Путь к картинке из старого каталога: assets/images/cache/catalog/... */
    image_legacy: string;
    image_title: string;
    menu_path: string[];
    sort_order: number;
}

export interface Settings {
    discount_percent: number;
}
