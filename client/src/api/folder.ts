import apiClient from './client';
import type { Folder, ShareLink } from './types/api';

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

export const editFolder = async (folderId: string, data: { name: string }) => {
  const result = await apiClient<Folder>(`/folders/${folderId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return result.data;
};

export const deleteFolder = async (folderId: string) => {
  const result = await apiClient(`/folders/${folderId}`, {
    method: 'DELETE',
  });

  return result.message;
};

export const getShareLink = async (data: { folderId: string; expiresAt: Date }) => {
  const result = await apiClient<ShareLink>(`/shares`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result.data;
};
