import type { Files, Folders, Shares } from '../../generated/prisma/client';

// folders table types
export type FolderCreateNew = Pick<Folders, 'name' | 'ownerId'>;
export type FolderFetchData = Pick<Folders, 'id' | 'ownerId'>;
export type FolderUpdate = Pick<Folders, 'id' | 'ownerId' | 'name'>;
export type FolderGetParameters = {
  folderId: Folders['id'];
  ownerId: Folders['ownerId'];
  includeFiles: boolean;
};
export type FolderGetByIdParameters = {
  folderId: Folders['id'];
  includeId: boolean;
  includeFiles: boolean;
};

// files table types
export type FileUpload = Omit<Files, 'id' | 'uploadedAt' | 'folderId'>;
export type FileGetParameters = {
  fileId: Files['id'];
  folderId: Files['folderId'];
};

// folder shares types
export type ShareCreateParameter = {
  resourceId: Shares['resourceId'];
  expiresAt: Shares['expiresAt'];
};
