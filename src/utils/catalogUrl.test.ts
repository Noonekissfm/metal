import { buildCatalogUrl, buildProductUrl, MAX_CATALOG_DEPTH } from './catalogUrl';

describe('buildCatalogUrl', () => {
    it('отбрасывает служебный корень index', () => {
        expect(buildCatalogUrl(['index', 'chernyy', 'trubnyy'])).toBe('/catalog/chernyy/trubnyy');
    });

    it('для самого корня даёт /catalog', () => {
        expect(buildCatalogUrl(['index'])).toBe('/catalog');
        expect(buildCatalogUrl([])).toBe('/catalog');
    });
});

describe('buildProductUrl', () => {
    it('дописывает ключ товара к пути категории', () => {
        expect(buildProductUrl(['index', 'specstali', 'stal-10880'], 'krug-110')).toBe(
            '/catalog/specstali/stal-10880/krug-110',
        );
    });

    it('на предельной глубине всё ещё ведёт на товар', () => {
        const keys = ['index', ...Array.from({ length: MAX_CATALOG_DEPTH - 1 }, (_, i) => `c${i}`)];

        expect(buildProductUrl(keys, 'leaf').endsWith('/leaf')).toBe(true);
    });

    it('глубже маршрутов ведёт на категорию, а не на несуществующий адрес', () => {
        const keys = ['index', ...Array.from({ length: MAX_CATALOG_DEPTH }, (_, i) => `c${i}`)];

        expect(buildProductUrl(keys, 'leaf')).toBe(buildCatalogUrl(keys));
    });
});
