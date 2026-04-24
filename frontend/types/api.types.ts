
export interface NestErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: string[];
}
