import type { Folders } from '../../../generated/prisma/client.ts';
import { prisma } from '../../lib/prisma.js';
import type {
  FileGetParameters,
  FileUpload,
  FolderCreateNew,
  FolderFetchData,
  FolderGetByIdParameters,
  FolderGetParameters,
  FolderUpdate,
} from '../../types/db.ts';

export const createFolder = ({ ownerId, name }: FolderCreateNew) => {
  return prisma.folders.create({
    data: { name, ownerId },
    omit: { ownerId: true },
  });
};

export const getUserFolders = (ownerId: Folders['ownerId']) => {
  return prisma.folders.findMany({
    where: { ownerId },
    include: {
      _count: { select: { files: true } },
    },
    omit: { ownerId: true },
  });
};

export const getFolderForOwner = ({ ownerId, folderId, includeFiles }: FolderGetParameters) => {
  return prisma.folders.findUnique({
    where: { id: folderId, ownerId },
    include: {
      files: includeFiles && {
        omit: { url: true },
      },
      _count: { select: { files: true } },
    },
    omit: { ownerId: true },
  });
};

export const getFolderById = ({ folderId, includeId, includeFiles }: FolderGetByIdParameters) => {
  return prisma.folders.findUnique({
    where: { id: folderId },
    include: {
      files: includeFiles && { omit: { url: true } },
      _count: {select: {files: true}}
    },
    omit: { id: !includeId, ownerId: true },
  });
};

export const updateFolderName = ({ ownerId, id: folderId, name: newFolderName }: FolderUpdate) => {
  return prisma.folders.update({
    where: { id: folderId, ownerId },
    data: {
      name: newFolderName,
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

export const deleteFile = async ({ fileId, folderId }: FileGetParameters) => {
  return prisma.files.delete({
    where: { id: fileId, folderId: folderId },
  });
};
