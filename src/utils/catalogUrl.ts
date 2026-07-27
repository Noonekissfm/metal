/** Сборка адресов каталога из ключей. Первый ключ в цепочке — служебный
 *  корень «index», в адрес он не попадает (см. hooks/useUrlParams). */

/** В App.tsx объявлены маршруты для catalog и максимум шести сегментов
 *  после него. Всё, что глубже, открыть по прямой ссылке нельзя. */
export const MAX_CATALOG_DEPTH = 6;

export const buildCatalogUrl = (pathKeys: string[]): string => {
    const segments = pathKeys.slice(1);

    return segments.length ? `/catalog/${segments.join('/')}` : '/catalog';
};

/** Адрес товара; если он лежит глубже, чем есть маршруты, ведём на
 *  категорию — она откроется, а несуществующий адрес дал бы 404. */
export const buildProductUrl = (categoryPathKeys: string[], productKey: string): string => {
    const full = [...categoryPathKeys, productKey];

    return buildCatalogUrl(
        full.length - 1 > MAX_CATALOG_DEPTH ? categoryPathKeys : full,
    );
};
