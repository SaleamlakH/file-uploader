import apiClient from './client';
import type { Folder, User } from './types/api';

export interface LoginFormFields {
  email: string;
  password: string;
}

export interface SignupFormFields extends LoginFormFields {
  confirmPassword: string;
}

export const getUser = async () => {
  const result = await apiClient<User>('/auth/me');
  return result.data;
};

export const login = async (data: LoginFormFields) => {
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

export const signup = async (data: SignupFormFields) => {
  const result = await apiClient<User & { folders: Folder[] }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result.data;
};
