import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../types/authenticated-request';
import { getFolderForOwner } from './folders.service';
import { sendError } from '../../errors/sendError';

const createLoadOwnedFolderMw = (options?: { includeFiles?: boolean }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    const folderId = req.params['folderId'] || req.body.folderId;

    try {
      const folder = await getFolderForOwner({
        folderId: folderId,
        ownerId: authReq.user.id,
        includeFiles: options?.includeFiles || false,
      });

      if (!folder) return sendError(res, 404, 'Folder not found');
      req.folder = folder;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const loadOwnedFolder = createLoadOwnedFolderMw();
export const loadOwnedFolderWithFiles = createLoadOwnedFolderMw({ includeFiles: true });
