import { useEffect } from 'react';

/** Сколько модальных окон сейчас открыто. Считаем, потому что если открыты
 *  два, то закрытие первого не должно вернуть прокрутку второму. */
let lockCount = 0;
let restoreTo = '';

/** Запрещает прокрутку страницы, пока компонент открыт.
 *  До этого две копии этого кода жили в RequestCallForm и CheckoutForm,
 *  и обе возвращали overflow в 'unset', а не в прежнее значение. */
export const useBodyScrollLock = (isLocked: boolean = true) => {
    useEffect(() => {
        if (!isLocked) return;

        if (lockCount === 0) {
            restoreTo = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }

        lockCount += 1;

        return () => {
            lockCount -= 1;

            if (lockCount === 0) {
                document.body.style.overflow = restoreTo;
            }
        };
    }, [isLocked]);
};
