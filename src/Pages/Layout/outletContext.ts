import { useOutletContext } from 'react-router-dom';

/** Окно «заказать звонок» живёт в Layout, а открывают его и страницы тоже —
 *  например, кнопка в первом экране главной. Передаём через Outlet, чтобы
 *  не заводить отдельный контекст ради одной функции. */
export interface LayoutContext {
    onRequestCall: () => void;
}

export const useLayoutContext = (): LayoutContext => useOutletContext<LayoutContext>();
