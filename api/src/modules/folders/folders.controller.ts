import type { NextFunction, Request, Response } from 'express';
import * as services from './folders.service';
import type { AuthenticatedRequest } from '../../types/authenticated-request';

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
  const { folderId } = req.params;
  const authReq = req as AuthenticatedRequest;

  try {
    const folder = await services.getFolderWithFiles({
      ownerId: authReq.user.id,
      id: String(folderId),
    });
    res.json(folder);
  } catch (error) {
    next(error);
  }
};
