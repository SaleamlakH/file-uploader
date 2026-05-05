import { body } from 'express-validator';
import { handleValidationResult } from '../../middlewares/handleValidationResult.js';

const folderNameValidator = body('name').trim().notEmpty().withMessage('Folder name is required');

export const validateFolderName = [folderNameValidator, handleValidationResult];
