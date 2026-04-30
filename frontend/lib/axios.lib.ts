import { notify } from './notifications';
import axios, { AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';
import { ApiError } from '@/types/api.types';
import { SESSION_COOKIE_NAME } from '@/constants/session.constants';
import { logout } from '@/app/(auth)/logout/route';

const isServer = typeof window === 'undefined';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (!isServer) {
    const token = getCookie(SESSION_COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  async (error: ApiError) => {
    const status = error.response?.data?.statusCode;
    const message = error.response?.data?.message;

    if (status === 401 || message === 'SESSION_NOT_FOUND') {
      if (typeof window !== 'undefined') {
        notify.error('Tu sesión ha expirado. Por favor, ingresa tus credenciales nuevamente.', {
          title: 'Sesión Expirada',
          duration: 6000,
          sonido: true,
        });
        setTimeout(async () => {
          await logout();
        }, 1500);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
