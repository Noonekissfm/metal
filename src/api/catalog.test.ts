import { searchProducts } from './catalog';

/** Возвращает разобранный фильтр последнего запроса. */
const mockFetch = () =>
    jest.spyOn(global, 'fetch').mockImplementation((input: any) =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ items: [], page: 1, totalPages: 1 }),
        } as Response),
    );

const lastFilter = (spy: jest.SpyInstance): string => {
    const url = new URL(String(spy.mock.calls[spy.mock.calls.length - 1][0]));

    return url.searchParams.get('filter') || '';
};

describe('searchProducts', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
        spy = mockFetch();
    });

    afterEach(() => jest.restoreAllMocks());

    it('не ходит на сервер из-за одной буквы', async () => {
        await expect(searchProducts('т')).resolves.toEqual([]);
        expect(spy).not.toHaveBeenCalled();
    });

    it('не пускает в фильтр кавычки и слэши', async () => {
        await expect(searchProducts('труба"')).resolves.toEqual([]);
        await expect(searchProducts('труба\\')).resolves.toEqual([]);
        expect(spy).not.toHaveBeenCalled();
    });

    // LIKE в SQLite не различает регистр только для латиницы: «труба»
    // находит 218 товаров, «Труба» — 2213, «ТРУБА» — ни одного.
    it('для строчного запроса ищет и вариант с большой буквы', async () => {
        await searchProducts('труба');

        expect(lastFilter(spy)).toBe('(title~"труба" || title~"Труба")');
    });

    it('капслок приводит к обоим обычным вариантам, сохраняя исходный', async () => {
        await searchProducts('ГОСТ');

        // Исходный вариант нужен: в названиях «ГОСТ» написан капслоком.
        expect(lastFilter(spy)).toBe('(title~"ГОСТ" || title~"гост" || title~"Гост")');
    });

    it('запрос с большой буквы не дублируется', async () => {
        await searchProducts('Труба');

        expect(lastFilter(spy)).toBe('(title~"Труба" || title~"труба")');
    });

    // «Труба 40» подряд не встречается ни в одном названии: они выглядят как
    // «Труба нержавеющая AISI201 квадратная 40х40х1,5х6000мм».
    it('каждое слово ищется отдельно, порядок слов не важен', async () => {
        await searchProducts('труба 40');

        expect(lastFilter(spy)).toBe('(title~"труба" || title~"Труба") && (title~"40")');
    });

    it('просит одну страницу, а не весь каталог', async () => {
        await searchProducts('труба');

        const url = new URL(String(spy.mock.calls[0][0]));

        expect(url.searchParams.get('perPage')).toBe('20');
    });
});
