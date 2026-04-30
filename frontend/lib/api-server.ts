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
    get: <T>(url: string, cfg?: AxiosRequestConfig) => api.get<T>(url, config(cfg)),

    post: <T>(url: string, data?: unknown, cfg?: AxiosRequestConfig) =>
      api.post<T>(url, data, config(cfg)),
  };
};
