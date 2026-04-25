import type { NextFunction, Request, Response } from 'express';
import { createShare } from './shares.service';

export const generateShareLink = async (req: Request, res: Response, next: NextFunction) => {
  const { expiresAt } = req.body;

  try {
    const share = await createShare({ resourceId: req.folder.id, expiresAt });

    res.json({ path: `shares/${share.token}`, expiresAt: share.expiresAt });
  } catch (error) {
    next(error);
  }
};
