import type { NextFunction, Request, Response } from 'express';
import * as services from './folders.service.js';
import type { AuthenticatedRequest } from '../../types/authenticated-request.js';
import multer from 'multer';
import { sendError } from '../../errors/sendError.js';
import { supabase } from '../../lib/supabase.js';

export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;

  try {
    const folder = await services.createFolder({ ownerId: authReq.user.id, name: req.body.name });

    res.json({ data: folder });
  } catch (error) {
    next(error);
  }
};

export const getAllFolders = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;

  try {
    const folders = await services.getUserFolders(authReq.user.id);
    res.json({ data: folders });
  } catch (error) {
    next(error);
  }
};

export const getFolderFiles = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ data: req.folder });
};

export const changeFolderName = async (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    const folder = await services.updateFolderName({
      ownerId: authReq.user.id,
      id: String(folderId),
      name: req.body.name,
    });

    res.json({ data: folder });
  } catch (error) {
    next(error);
  }
};

export const deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    await services.deleteFolder({ ownerId: authReq.user.id, id: String(folderId) });
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = [
  multer({ storage: multer.memoryStorage() }).array('files'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { folderId } = req.params;
    const authReq = req as AuthenticatedRequest;

    const files = authReq.files as Express.Multer.File[];
    if (!files) return sendError(res, 404, 'No files uploaded');

    try {
      const uploadedFiles = [];
      const errors = [];

      for (const file of files) {
        const filePath = `${authReq.user.id}/${file.originalname}`;

        const { data, error } = await supabase.storage
          .from('file_uploader_files')
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
          });

        if (error) {
          errors.push({ error, fileData: { filename: file.originalname } });
          continue;
        }

        uploadedFiles.push({
          size: file.size,
          filename: file.originalname,
          type: file.mimetype,
          url: data.path,
        });
      }

      // save data to database
      const folderFiles = await services.createFolderFiles(
        { ownerId: authReq.user.id, id: String(folderId) },
        uploadedFiles,
      );

      res.json({ data: folderFiles.files, error: errors });
    } catch (error) {
      next(error);
    }
  },
];

export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
  const { fileId, folderId } = req.params;

  try {
    const file = await services.getFile({ fileId: String(fileId), folderId: String(folderId) });
    if (!file) return sendError(res, 404, 'File not found');

    const { data, error } = await supabase.storage.from('file_uploader_files').download(file.url);

    if (error) return next(error);

    const buffer = Buffer.from(await data.arrayBuffer());

    res.setHeader('Content-Type', file.type);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  const { fileId } = req.params;

  try {
    const file = await services.getFile({ fileId: fileId as string, folderId: req.folder.id });

    if (!file) return sendError(res, 404, 'File not found');

    // delete file
    const { error } = await supabase.storage.from('file_uploader_files').remove([file.url]);

    if (error) return next(error);
    await services.deleteFile({ fileId: fileId as string, folderId: req.folder.id });
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    next(error);
  }
};
