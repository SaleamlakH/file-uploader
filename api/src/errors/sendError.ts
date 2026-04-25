import type { Response } from 'express';

export const sendError = (res: Response, status: number, message: string, errors?: unknown) => {
  return res.status(status).json({
    error: { message, errors },
  });
};
