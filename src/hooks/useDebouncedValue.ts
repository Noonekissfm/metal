import { useEffect, useState } from 'react';

/** Значение, которое «догоняет» переданное с задержкой: пока человек
 *  печатает, запрос не уходит. */
export const useDebouncedValue = <T,>(value: T, delayMs: number): T => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = window.setTimeout(() => setDebounced(value), delayMs);

        return () => window.clearTimeout(timer);
    }, [value, delayMs]);

    return debounced;
};
