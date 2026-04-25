import { body } from 'express-validator';
import { handleValidationResult } from '../../middlewares/handleValidationResult';

const folderIdValidation = body('folderId').trim().notEmpty().withMessage('folderId is required');

const expiresAtValidation = body('expiresAt')
  .notEmpty()
  .withMessage('Expire date is required')
  .bail()
  .isISO8601()
  .withMessage('Expire date must be a valid ISO 8601 datetime (e.g. 2026-04-25T15:30:00Z)')
  .bail()
  .toDate()
  .isAfter()
  .withMessage('Expire date must be in the future');

export const validateShareForm = [folderIdValidation, expiresAtValidation, handleValidationResult];
