import apiClient from './client';
import type { Folder } from './types/api';

export const getAllFolder = async () => {
  const folders = await apiClient<Folder[]>('/folders');
  return folders.data;
};