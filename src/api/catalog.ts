import { Category, Product, Settings } from 'src/models/catalog';
import { DEFAULT_DISCOUNT_PERCENT } from 'src/utils/price';

export const PB_BASE = (process.env.REACT_APP_PB_URL || 'https://met-c.ru/pb').replace(/\/$/, '');

const PER_PAGE = 500;

interface PbList<T> {
    items: T[];
    page: number;
    totalPages: number;
}

const request = async <T>(path: string, params: Record<string, string>): Promise<T> => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${PB_BASE}${path}?${query}`);

    if (!response.ok) {
        throw new Error(`Каталог недоступен (${response.status})`);
    }

    return response.json();
};

/** PocketBase отдаёт максимум 500 записей за раз. */
const listAll = async <T>(collection: string, params: Record<string, string>): Promise<T[]> => {
    const items: T[] = [];
    let page = 1;

    for (;;) {
        const payload = await request<PbList<T>>(`/api/collections/${collection}/records`, {
            ...params,
            page: String(page),
            perPage: String(PER_PAGE),
        });

        items.push(...payload.items);

        if (page >= (payload.totalPages || 1)) return items;
        page += 1;
    }
};

// Описания категорий занимают вчетверо больше самого дерева, поэтому в
// общий запрос не попадают — они нужны только на открытой странице.
const CATEGORY_FIELDS = 'id,key,title,parent,menu_path,sort_order,base_price';
const PRODUCT_FIELDS =
    'id,key,title,category,description,price,image,image_legacy,image_title,menu_path,sort_order';

/** Всё дерево категорий — около 20 КБ, забираем один раз за сеанс. */
export const fetchCategories = (): Promise<Category[]> =>
    listAll<Category>('categories', { fields: CATEGORY_FIELDS, sort: 'sort_order,title' });

export const fetchCategoryDescription = async (categoryId: string): Promise<string> => {
    const record = await request<{ description?: string }>(
        `/api/collections/categories/records/${categoryId}`,
        { fields: 'description' },
    );

    return record.description || '';
};

export const fetchProductsByCategory = (categoryId: string): Promise<Product[]> =>
    listAll<Product>('products', {
        fields: PRODUCT_FIELDS,
        filter: `category="${categoryId}"`,
        sort: 'sort_order,title',
    });

export const fetchProductByKey = async (key: string): Promise<Product | null> => {
    // Ключ приходит из адресной строки — кавычки в фильтр не пускаем.
    if (/["\\]/.test(key)) return null;

    const payload = await request<PbList<Product>>('/api/collections/products/records', {
        fields: PRODUCT_FIELDS,
        filter: `key="${key}"`,
        perPage: '1',
    });

    return payload.items[0] || null;
};

export const fetchSettings = async (): Promise<Settings> => {
    const payload = await request<PbList<Settings>>('/api/collections/settings/records', {
        perPage: '1',
    });

    const settings = payload.items[0];

    return {
        discount_percent:
            typeof settings?.discount_percent === 'number'
                ? settings.discount_percent
                : DEFAULT_DISCOUNT_PERCENT,
    };
};

/** Картинка товара: загруженная сотрудником или из старого набора в /public. */
export const resolveImageUrl = (product: {
    id: string;
    image?: string;
    image_legacy?: string;
}): string | null => {
    if (product.image) {
        return `${PB_BASE}/api/files/products/${product.id}/${product.image}`;
    }

    if (product.image_legacy) {
        return `/${product.image_legacy.replace(/^\//, '')}`;
    }

    return null;
};
