import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { CartProvider, useCart } from './CartContext';

const LINE = {
    key: 'krug-40',
    title: 'Круг 40',
    menuPath: ['Каталог', 'Спецстали'],
    unitPrice: 100000,
    qty: 0.5,
};

let cart: ReturnType<typeof useCart>;

const Probe: React.FC = () => {
    cart = useCart();

    return (
        <div>
            <span data-testid="count">{cart.itemsCount}</span>
            <span data-testid="total">{cart.total}</span>
        </div>
    );
};

const renderCart = () =>
    render(
        <CartProvider>
            <Probe />
        </CartProvider>,
    );

describe('корзина', () => {
    beforeEach(() => window.localStorage.clear());

    it('складывает количество одного товара и считает сумму', () => {
        renderCart();

        act(() => cart.addItem(LINE));
        act(() => cart.addItem(LINE));

        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('total')).toHaveTextContent('100000');
    });

    it('держит дробные тонны и не пускает ноль', () => {
        renderCart();

        act(() => cart.addItem(LINE));
        act(() => cart.setQty(LINE.key, 2.5));
        expect(screen.getByTestId('total')).toHaveTextContent('250000');

        act(() => cart.setQty(LINE.key, 0));
        expect(screen.getByTestId('total')).toHaveTextContent('10000');
    });

    it('переживает перезагрузку страницы', () => {
        const view = renderCart();
        act(() => cart.addItem(LINE));
        view.unmount();

        renderCart();
        expect(screen.getByTestId('count')).toHaveTextContent('1');
        expect(screen.getByTestId('total')).toHaveTextContent('50000');
    });

    it('обновляет цену и чистится', () => {
        renderCart();

        act(() => cart.addItem(LINE));
        act(() => cart.setPrice(LINE.key, 90000));
        expect(screen.getByTestId('total')).toHaveTextContent('45000');

        act(() => cart.clear());
        expect(screen.getByTestId('count')).toHaveTextContent('0');
    });
});
