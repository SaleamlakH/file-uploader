import apiClient from './client';
import type { File as FileInfo, Folder, ShareLink } from './types/api';

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

export const getFolderFiles = async (folderId: string) => {
  const result = await apiClient<Folder & { files: FileInfo[] }>(`/folders/${folderId}/files`);
  return result.data;
};

export const uploadFiles = async (folderId: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const result = await apiClient<FileInfo[]>(`/folders/${folderId}/files`, {
    method: 'POST',
    body: formData,
  });

  return result.data;
};

export const downloadFile = async (folderId: string, fileId: string) => {
  const result = await apiClient<{ blob: Blob; headers: Headers }>(
    `/folders/${folderId}/files/${fileId}`,
    {
      responseType: 'blob',
    },
  );

  if (!result.data) throw new Error('No file returned');

  const url = window.URL.createObjectURL(result.data.blob);
  const contentDisposition = result.data.headers.get('Content-Disposition');
  const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'download-file';

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();

  window.URL.revokeObjectURL(url);
};

export const deleteFile = async (folderId: string, fileId: string) => {
  const result = await apiClient(`/folders/${folderId}/files/${fileId}`, {
    method: 'DELETE',
  });

  return result.message;
};
