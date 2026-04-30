export interface NestErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
  status?: string;
}

export interface DataResponse {
  data: NestErrorResponse;
}

export interface ApiError {
  message: string;
  errors?: string[];
  response?: DataResponse;
}
