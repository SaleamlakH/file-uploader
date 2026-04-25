import type { NextFunction, Request, Response } from 'express';
import { createShare, getShare } from './shares.service';
import { getFile, getFolderById } from '../folders/folders.service';
import path from 'node:path';

export const generateShareLink = async (req: Request, res: Response, next: NextFunction) => {
  const { expiresAt } = req.body;

  try {
    const share = await createShare({ resourceId: req.folder.id, expiresAt });

    res.json({ path: `shares/${share.token}`, expiresAt: share.expiresAt });
  } catch (error) {
    next(error);
  }
};

export const getSharedFolderWithFiles = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params;

  try {
    const share = await getShare(String(token));
    if (!share) return res.sendStatus(404);

    const folder = await getFolderById({
      folderId: share.resourceId,
      includeId: false,
      includeFiles: true,
    });

    if (!folder) return res.sendStatus(404);

    res.json(folder);
  } catch (error) {
    next(error);
  }
};

export const downloadSharedFolderFile = async (req: Request, res: Response, next: NextFunction) => {
  const { token, fileId } = req.params;

  try {
    const share = await getShare(String(token));
    if (!share) return res.sendStatus(404);

    const file = await getFile({ fileId: String(fileId), folderId: share.resourceId });
    if (!file) return res.sendStatus(404);

    const filePath = path.join(process.cwd(), file.url);

    res.download(filePath, file.filename, (error) => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
};
