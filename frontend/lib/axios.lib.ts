import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { NestErrorResponse, ApiError } from "@/types/api.types";

// Instancia de Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor para peticiones:
 * Aquí podrías añadir lógica si necesitas inyectar algo
 * dinámicamente antes de enviar la petición.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * Interceptor para respuestas:
 * Normaliza los errores de NestJS para que no tengas que
 * hacer .response.data en cada try/catch.
 */
api.interceptors.response.use(
  <T>(response: AxiosResponse<T>): T => response.data,
  (error: AxiosError<NestErrorResponse>) => {
    const response = error.response;

    const customError: ApiError = {
      message: Array.isArray(response?.data?.message)
        ? response?.data.message.join(", ")
        : response?.data?.message || "Error desconocido",
      status: response?.status,
      errors: Array.isArray(response?.data?.message)
        ? response?.data.message
        : undefined,
    };

    return Promise.reject(customError);
  }
);

export default api;
