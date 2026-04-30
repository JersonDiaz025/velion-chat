import api from '@/lib/axios.lib';
import { FULL_LOGIN, FULL_REGISTER } from '@/constants/routes.constants';
import { LoginDto, RegisterDto, AuthResponse } from '@/types/auth.types';

export const AuthService = {
  login: (data: LoginDto): Promise<AuthResponse> => api.post(FULL_LOGIN, data),
  register: (data: RegisterDto): Promise<AuthResponse> => api.post(FULL_REGISTER, data),
};
