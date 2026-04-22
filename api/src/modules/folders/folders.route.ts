import { Router } from 'express';
import * as controllers from './folders.controller';
import { requireAuth } from '../../middlewares/requireAuth';

const foldersRouter = Router();

// check authorization
foldersRouter.use('/', requireAuth);

// get all folders
foldersRouter.get('/', controllers.getAllFolders);

// get all files of a folder
foldersRouter.get('/:folderId', controllers.getFolderFiles);

export default foldersRouter;
