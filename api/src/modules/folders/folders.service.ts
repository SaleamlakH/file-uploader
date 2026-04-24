import type { Folders } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import type { FileGetParameters, FileUpload, FolderCreateNew, FolderFetchData, FolderUpdate } from '../../types/db';

export const createFolder = ({ ownerId, folder: folderName }: FolderCreateNew) => {
  return prisma.folders.create({
    data: { folder: folderName, ownerId },
    omit: { ownerId: true },
  });
};

export const getUserFolders = (ownerId: Folders['ownerId']) => {
  return prisma.folders.findMany({
    where: { ownerId },
    omit: { ownerId: true },
  });
};

export const getFolderWithFilesForOwner = ({ ownerId, id: folderId }: FolderFetchData) => {
  return prisma.folders.findUnique({
    where: { id: folderId, ownerId },
    include: {
      files: {
        omit: { url: true },
      },
    },
    omit: { ownerId: true },
  });
};

export const updateFolderName = ({
  ownerId,
  id: folderId,
  folder: newFolderName,
}: FolderUpdate) => {
  return prisma.folders.update({
    where: { id: folderId, ownerId },
    data: {
      folder: newFolderName,
    },
    omit: { ownerId: true },
  });
};

export const deleteFolder = ({ ownerId, id: folderId }: FolderFetchData) => {
  return prisma.folders.delete({
    where: { id: folderId, ownerId },
    omit: { ownerId: true },
  });
};

export const createFolderFiles = async (
  { ownerId, id: folderId }: FolderFetchData,
  filesData: FileUpload[],
) => {
  return prisma.folders.update({
    where: { id: folderId, ownerId },
    data: {
      files: {
        create: filesData,
      },
    },
    include: { files: true },
  });
};

export const getFile = async ({ fileId, folderId }: FileGetParameters) => {
  return prisma.files.findUnique({
    where: { id: fileId, folderId },
  });
};
