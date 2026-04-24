import api from '@/lib/axios.lib';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth.types';

export const AuthService = {
  login: (data: LoginDto) =>
    api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterDto) =>
    api.post<AuthResponse>('/auth/register', data),

  // Ejemplo de ruta protegida (el token se enviará en los Actions)
  getProfile: (token: string) =>
    api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }),
};
