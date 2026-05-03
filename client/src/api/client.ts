import { ApiError } from './error';
import type { ApiErrorResponse, ApiSuccessResponse } from './types/api';

const apiClient = async <T>(
  path: string,
  options: RequestInit & { responseType?: 'blob' | 'json' } = {},
): Promise<ApiSuccessResponse<T>> => {
  const { responseType = 'json', ...fetchOptions } = options;

  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    ...fetchOptions,
    credentials: 'include',
    headers: {
      ...(!(fetchOptions.body instanceof FormData) && { 'Content-Type': 'application/json' }),
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new ApiError(response.status, errorData.error.message, errorData);
  }

  if (responseType === 'blob') {
    const blob = await response.blob();
    return {
      data: {
        blob,
        headers: response.headers,
      } as T,
    };
  }

  return await response.json();
};

export default apiClient;
