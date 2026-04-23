import { Router } from 'express';
import * as controllers from './folders.controller';
import { requireAuth } from '../../middlewares/requireAuth';
import { validateFolderName } from './folders.validator';
import { loadOwnedFolder } from './folders.middleware';

const foldersRouter = Router();

// check authorization'
foldersRouter.use('/', requireAuth);

// responds 404 if not found
// attach folder to req if found
foldersRouter.use('/:folderId', loadOwnedFolder);

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

// Routes related to
// File uploading and fetching

foldersRouter.post('/:folderId/files', controllers.uploadFiles);

export default foldersRouter;
