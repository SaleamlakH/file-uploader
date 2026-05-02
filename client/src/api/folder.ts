import apiClient from './client';
import type { Folder } from './types/api';

export const getAllFolder = async () => {
  const folders = await apiClient<Folder[]>('/folders');
  return folders.data;
};

export const createFolder = async (data: { name: string }) => {
  const folder = await apiClient<Folder>(`/folders`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return folder.data;
};
