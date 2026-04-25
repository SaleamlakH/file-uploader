import type { NextFunction, Request, Response } from 'express';
import { sendError } from '../errors/sendError';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    // unauthorized user
    return sendError(res, 401, 'Unauthorized');
  }

  next();
};
