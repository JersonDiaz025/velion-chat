export interface LoginDto {
  email: string;
  password: string;
}

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
  avatar: {
    initials: string | null;
    color: string | null;
  };
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
