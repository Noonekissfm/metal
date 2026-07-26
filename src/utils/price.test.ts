import { applyDiscount, formatPrice, formatQty, lineTotal, parsePrice } from './price';

describe('цены', () => {
    it('читает строки из старого каталога', () => {
        expect(parsePrice('297000.00')).toBe(297000);
        expect(parsePrice(154900)).toBe(154900);
        expect(parsePrice(null)).toBeNull();
        expect(parsePrice('')).toBeNull();
    });

    it('вычитает скидку', () => {
        expect(applyDiscount(100000, 2)).toBe(98000);
        expect(applyDiscount(154900, 2)).toBe(151802);
        expect(applyDiscount(100000, 0)).toBe(100000);
        expect(applyDiscount(null, 2)).toBeNull();
    });

    it('разделяет разряды — раньше цена шла сплошным числом', () => {
        expect(formatPrice(291060).replace(/ /g, ' ')).toBe('291 060,00');
    });

    it('показывает тоннаж без лишних нулей', () => {
        expect(formatQty(0.5)).toBe('0,5');
        expect(formatQty(2)).toBe('2');
    });

    it('считает строку заказа', () => {
        expect(lineTotal(151802, 0.5)).toBe(75901);
    });
});
