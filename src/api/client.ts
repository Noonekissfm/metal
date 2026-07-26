export const API_BASE = (process.env.REACT_APP_API_URL || 'https://met-c.ru').replace(/\/$/, '');

export interface ApiResult {
    ok: boolean;
    error?: string;
    [key: string]: unknown;
}

const GENERIC_ERROR = 'Не удалось отправить заявку. Позвоните нам, пожалуйста.';

/** Бэкенд отвечает JSON и настоящими CORS-заголовками, поэтому
 *  ошибку наконец-то можно показать пользователю (раньше был mode: 'no-cors'). */
export const postJson = async (path: string, data: unknown): Promise<ApiResult> => {
    let response: Response;

    try {
        response = await fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch {
        return { ok: false, error: 'Нет связи с сервером. Проверьте интернет или позвоните нам.' };
    }

    let payload: ApiResult | null = null;

    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        return { ok: false, error: payload?.error || GENERIC_ERROR };
    }

    return payload || { ok: true };
};
