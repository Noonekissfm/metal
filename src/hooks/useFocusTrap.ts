import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

/** Держит фокус внутри окна, закрывает по Escape и возвращает фокус туда,
 *  откуда окно открыли. Ни у одного из двух существующих модальных окон
 *  ничего этого не было: Tab уводил на страницу под ними. */
export const useFocusTrap = (
    containerRef: RefObject<HTMLElement>,
    onClose: () => void,
    isActive: boolean = true,
) => {
    // В ref, чтобы обработчик не переподписывался на каждый рендер.
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!isActive) return;

        const container = containerRef.current;
        const previouslyFocused = document.activeElement as HTMLElement | null;

        const focusable = () =>
            Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) || []).filter(
                (element) => element.offsetParent !== null,
            );

        focusable()[0]?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onCloseRef.current();
                return;
            }

            if (event.key !== 'Tab') return;

            const items = focusable();
            if (!items.length) return;

            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;

            // На краях списка Tab заворачивает обратно внутрь окна.
            if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            } else if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            previouslyFocused?.focus();
        };
    }, [containerRef, isActive]);
};
