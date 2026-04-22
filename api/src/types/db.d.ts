import type { Folders } from '../../generated/prisma/client';

// folders table types
export type FolderCreateNew = Pick<Folders, 'folder' | 'ownerId'>;
export type FolderFetchData = Pick<Folders, 'id' | 'ownerId'>;
export type FolderUpdate = Pick<Folders, 'id' | 'ownerId' | 'folder'>;
