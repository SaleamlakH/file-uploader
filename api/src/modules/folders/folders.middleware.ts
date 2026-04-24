import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedRequest } from '../../types/authenticated-request';
import { getFolderWithFilesForOwner } from './folders.service';

export const loadOwnedFolder = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthenticatedRequest;
  const { folderId } = req.params;

  try {
    const folder = await getFolderWithFilesForOwner({
      id: String(folderId),
      ownerId: authReq.user.id,
    });

    if (!folder) return res.sendStatus(404);
    req.folder = folder;
    next();
  } catch (error) {
    next(error);
  }
};
