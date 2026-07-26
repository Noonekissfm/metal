import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { CatalogProvider, useCatalog } from './CatalogContext';

const CATEGORIES = [
    { id: 'c0', key: 'index', title: 'Каталог', parent: '', menu_path: [], sort_order: 0, base_price: null },
    { id: 'c1', key: 'specstali', title: 'Спецстали', parent: 'c0', menu_path: [], sort_order: 0, base_price: 100000 },
    { id: 'c2', key: 'stal-40', title: 'Сталь 40', parent: 'c1', menu_path: [], sort_order: 0, base_price: null },
    { id: 'c3', key: 'cvetnoj', title: 'Цветной', parent: 'c0', menu_path: [], sort_order: 1, base_price: null },
];

const mockFetch = () => {
    jest.spyOn(global, 'fetch').mockImplementation((input: any) => {
        const url = String(input);
        const body = url.includes('/settings/')
            ? { items: [{ discount_percent: 2 }], page: 1, totalPages: 1 }
            : { items: CATEGORIES, page: 1, totalPages: 1 };

        return Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) } as Response);
    });
};

const Probe: React.FC = () => {
    const { isLoading, getNodeByKeys, getEffectivePrice } = useCatalog();

    if (isLoading) return <span>loading</span>;

    return (
        <ul>
            <li data-testid="deep">{getNodeByKeys(['index', 'specstali', 'stal-40'])?.title ?? 'null'}</li>
            <li data-testid="broken">{getNodeByKeys(['index', 'specstali', 'нет-такого'])?.title ?? 'null'}</li>
            <li data-testid="wrong-branch">
                {getNodeByKeys(['index', 'cvetnoj', 'stal-40'])?.title ?? 'null'}
            </li>
            <li data-testid="own">{String(getEffectivePrice({ price: 200000, category: 'c2' }))}</li>
            <li data-testid="inherited">{String(getEffectivePrice({ price: null, category: 'c2' }))}</li>
            <li data-testid="none">{String(getEffectivePrice({ price: null, category: 'c3' }))}</li>
            {/* PocketBase присылает пустое число как 0, а не как null. */}
            <li data-testid="zero">{String(getEffectivePrice({ price: 0, category: 'c2' }))}</li>
            <li data-testid="zero-none">{String(getEffectivePrice({ price: 0, category: 'c3' }))}</li>
        </ul>
    );
};

describe('каталог', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
        mockFetch();
    });

    afterEach(() => jest.restoreAllMocks());

    it('находит категорию по адресу и возвращает null на неизвестном сегменте', async () => {
        render(
            <CatalogProvider>
                <Probe />
            </CatalogProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('deep')).toHaveTextContent('Сталь 40'));

        // Раньше несовпавший сегмент молча игнорировался и открывалась
        // чужая страница вместо 404.
        expect(screen.getByTestId('broken')).toHaveTextContent('null');
        expect(screen.getByTestId('wrong-branch')).toHaveTextContent('null');
    });

    it('берёт цену товара, иначе ближайшей категории сверху, и вычитает скидку', async () => {
        render(
            <CatalogProvider>
                <Probe />
            </CatalogProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('own')).toHaveTextContent('196000'));
        expect(screen.getByTestId('inherited')).toHaveTextContent('98000');
        expect(screen.getByTestId('none')).toHaveTextContent('null');
    });

    it('пустая цена из PocketBase приходит нулём — товар не должен стоить 0', async () => {
        render(
            <CatalogProvider>
                <Probe />
            </CatalogProvider>,
        );

        await waitFor(() => expect(screen.getByTestId('zero')).toHaveTextContent('98000'));
        expect(screen.getByTestId('zero-none')).toHaveTextContent('null');
    });
});
