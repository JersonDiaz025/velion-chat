export interface LoginDto {
  email: string;
  password: string;
}

type Avatar = {
  initials: string;
  color: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export interface RegisterDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: Avatar;
}

export interface AuthResponse {
  token: string;
  message?: string;
  user: User;
}

export interface ApiError {
  message: string | string[];
  status?: number;
  errors?: Record<string, string[]>;
}
