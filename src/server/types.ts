export interface ApiResponse<T> {
  statusCode: number;
  success: true;
  data: T;
}

export interface ApiError {
  statusCode?: number;
  status?: number;
  success: false;
  message: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export const STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
