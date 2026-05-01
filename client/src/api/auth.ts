import apiClient from './client';
import type { User } from './types/api';

export const getUser = () => {
  return apiClient<User>('/auth/me');
};
