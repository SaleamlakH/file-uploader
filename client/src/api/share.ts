import apiClient from './client';
import type { File, Folder } from './types/api';

export const getSharedFolderWithFiles = async (token: string) => {
  const result = await apiClient<Folder & { files: File[] }>(`/shares/${token}`);

  return result.data;
};

export const downloadSharedFolderFile = async (token: string, fileId: string) => {
  const result = await apiClient<{ blob: Blob; headers: Headers }>(
    `/shares/${token}/files/${fileId}`,
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
