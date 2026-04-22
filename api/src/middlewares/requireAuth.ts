import type { NextFunction, Request, Response } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    // unauthorized user
    return res.sendStatus(401);
  }

  next();
};
