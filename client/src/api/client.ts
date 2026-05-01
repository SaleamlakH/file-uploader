import { ApiError } from './error';
import type { ApiErrorResponse, ApiSuccessResponse } from './types/api';

const apiClient = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const errorData = result as ApiErrorResponse;
    throw new ApiError(response.status, errorData.error.message, errorData);
  }

  return (result as ApiSuccessResponse<T>).data;
};

export default apiClient;
