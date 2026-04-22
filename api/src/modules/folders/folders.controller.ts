import type { NextFunction, Request, Response } from 'express';
import { getFolderWithFiles, getUserFolders } from './folders.service';

export const getAllFolders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const folders = await getUserFolders(req.user!.id);
    res.status(200).json(folders);
  } catch (error) {
    next(error);
  }
};

export const getFolderFiles = async (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  try {
    const folder = await getFolderWithFiles({ ownerId: req.user!.id, id: String(folderId) });
    res.json(folder);
  } catch (error) {
    next(error);
  }
};
