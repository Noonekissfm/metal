import { CartLine } from 'src/context/CartContext';
import { ApiResult, postJson } from './client';

export interface OrderPayload {
    phone: string;
    name?: string;
    comment?: string;
    /** Ловушка для ботов: живой человек это поле не видит и не заполняет. */
    company?: string;
    items: CartLine[];
    total: number;
}

export const postOrder = (payload: OrderPayload): Promise<ApiResult> =>
    postJson('/api/v1/order', {
        phone: payload.phone,
        name: payload.name || '',
        comment: payload.comment || '',
        company: payload.company || '',
        total: payload.total,
        items: payload.items.map((item) => ({
            key: item.key,
            title: item.title,
            qty: item.qty,
            unitPrice: item.unitPrice,
        })),
    });

export const postRequestCall = (data: {
    name?: string;
    phone: string;
    email?: string;
    message?: string;
    company?: string;
}): Promise<ApiResult> => postJson('/api/v1/request_call', data);
