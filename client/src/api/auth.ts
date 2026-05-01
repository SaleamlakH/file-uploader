import apiClient from './client';
import type { User } from './types/api';

export const getUser = async () => {
  const result = await apiClient<User>('/auth/me');
  return result.data;
};

export const login = async (data: { email: string; password: string }) => {
  const result = await apiClient<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result.data;
};

export const logout = async () => {
  const result = await apiClient<{ message: string }>('/auth/logout');

  return result.message;
};
