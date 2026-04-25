import type { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { mapValidationErrors } from '../errors/mapValidationErrors';
import { sendError } from '../errors/sendError';

export const handleValidationResult = (req: Request, res: Response, next: NextFunction) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = mapValidationErrors(errors.array());

    return sendError(res, 400, 'Validation failed', validationErrors);
  }

  // set sanitized data
  req.body = { ...req.body, ...matchedData(req, { locations: ['body'] }) };
  next();
};
