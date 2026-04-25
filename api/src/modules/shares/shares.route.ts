import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { loadOwnedFolder } from '../folders/folders.middleware';
import { validateShareForm } from './shares.validator';
import { generateShareLink, getSharedFolderWithFiles } from './shares.controllers';

const sharesRouter = Router();

sharesRouter.post('/', requireAuth, validateShareForm, loadOwnedFolder, generateShareLink);

sharesRouter.get('/:token', getSharedFolderWithFiles);

export default sharesRouter;
