import type { Files, Folders } from '../../generated/prisma/client';

// folders table types
export type FolderCreateNew = Pick<Folders, 'folder' | 'ownerId'>;
export type FolderFetchData = Pick<Folders, 'id' | 'ownerId'>;
export type FolderUpdate = Pick<Folders, 'id' | 'ownerId' | 'folder'>;
export type FolderGetParameters = {
  folderId: Folders['id'];
  ownerId: Folders['ownerId'];
  includeFiles: boolean;
};

// files table types
export type FileUpload = Omit<Files, 'id' | 'uploadedAt' | 'folderId'>;
export type FileGetParameters = {
  fileId: Files['id'];
  folderId: Files['folderId'];
};
