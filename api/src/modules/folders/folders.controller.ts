import type { NextFunction, Request, Response } from 'express';
import * as services from './folders.service';
import type { AuthenticatedRequest } from '../../types/authenticated-request';
import multer from 'multer';
import path from 'node:path';

export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;

  try {
    const { name } = req.body;
    const folder = await services.createFolder({ ownerId: authReq.user.id, folder: name });

    res.status(200).json(folder);
  } catch (error) {
    next(error);
  }
};

export const getAllFolders = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;

  try {
    const folders = await services.getUserFolders(authReq.user.id);
    res.status(200).json(folders);
  } catch (error) {
    next(error);
  }
};

export const getFolderFiles = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.folder);
};

export const changeFolderName = async (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    const { name } = req.body;
    const folder = await services.updateFolderName({
      ownerId: authReq.user.id,
      id: String(folderId),
      folder: name,
    });

    res.status(200).json(folder);
  } catch (error) {
    next(error);
  }
};

export const deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    await services.deleteFolder({ ownerId: authReq.user.id, id: String(folderId) });
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = [
  multer({ dest: 'uploads/' }).array('files'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { folderId } = req.params;
    const authReq = req as AuthenticatedRequest;

    const files = authReq.files as Express.Multer.File[];
    if (!files) return res.status(404).json({ message: 'No files uploaded' });

    // extract required properties
    const filesData = files.map(({ originalname, mimetype, size, path }) => ({
      size,
      filename: originalname,
      type: mimetype,
      url: path,
    }));

    try {
      const folderFiles = await services.createFolderFiles(
        { ownerId: authReq.user.id, id: String(folderId) },
        filesData,
      );

      res.status(200).json({ files: folderFiles });
    } catch (error) {
      next(error);
    }
  },
];

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
  const { fileId, folderId } = req.params;

  try {
    const file = await services.getFile({ fileId: String(fileId), folderId: String(folderId) });

    if (!file) return res.sendStatus(404);

    // from local
    // should be updated when cloud storage is ready
    const filePath = path.join(process.cwd(), file.url);
    res.setHeader('Content-Type', file.type);
    res.download(filePath, file.filename, (error) => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
};