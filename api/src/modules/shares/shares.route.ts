import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';
import { loadOwnedFolder } from '../folders/folders.middleware';
import { validateShareForm } from './shares.validator';
import { generateShareLink } from './shares.controllers';

const sharesRouter = Router();

sharesRouter.post('/', requireAuth, validateShareForm, loadOwnedFolder, generateShareLink);

export default sharesRouter;
