import { Router } from 'express';
import * as controllers from './folders.controller';
import { requireAuth } from '../../middlewares/requireAuth';
import { validateFolderName } from './folders.validator';

const foldersRouter = Router();

// check authorization'
foldersRouter.use('/', requireAuth);

// create new folder
foldersRouter.post('/', validateFolderName, controllers.createFolder);

// get all folders
foldersRouter.get('/', controllers.getAllFolders);

// get all files of a folder
foldersRouter.get('/:folderId', controllers.getFolderFiles);

// changeFolderName
foldersRouter.put('/:folderId', validateFolderName, controllers.changeFolderName);

// delete folder
foldersRouter.delete('/:folderId', controllers.deleteFolder);

export default foldersRouter;
