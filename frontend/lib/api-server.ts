import { cookies } from 'next/headers';
import api from '@/lib/axios.lib';
import { AxiosRequestConfig } from 'axios';

export const getApiServer = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');

    const config = (customConfig: AxiosRequestConfig = {}): AxiosRequestConfig => ({
        ...customConfig,
        headers: {
            ...customConfig.headers,
            Cookie: cookieHeader,
        },
    });

    return {
        get: async <T>(url: string, cfg?: AxiosRequestConfig): Promise<T> => {
            const res = await api.get<T>(url, config(cfg));
            return res as T;
        },

        post: async <T>(url: string, data?: unknown, cfg?: AxiosRequestConfig): Promise<T> => {
            const res = await api.post<T>(url, data, config(cfg));
            return res as T;
        },
    };
};
