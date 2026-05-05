import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { loadOwnedFolder } from '../folders/folders.middleware.js';
import { validateShareForm } from './shares.validator.js';
import {
  downloadSharedFolderFile,
  generateShareLink,
  getSharedFolderWithFiles,
} from './shares.controllers.js';

const sharesRouter = Router();

sharesRouter.post('/', requireAuth, validateShareForm, loadOwnedFolder, generateShareLink);

sharesRouter.get('/:token', getSharedFolderWithFiles);

sharesRouter.get('/:token/files/:fileId', downloadSharedFolderFile);

export default sharesRouter;
