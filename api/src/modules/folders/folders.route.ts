import { Router } from 'express';
import * as controllers from './folders.controller';
import { requireAuth } from '../../middlewares/requireAuth';
import { validateFolderName } from './folders.validator';
import { loadOwnedFolderWithFiles } from './folders.middleware';

const foldersRouter = Router();

// check authorization'
foldersRouter.use('/', requireAuth);

// responds 404 if not found
// attach folder to req if found
foldersRouter.use('/:folderId', loadOwnedFolderWithFiles);

// Folder CRUD routes
foldersRouter.post('/', validateFolderName, controllers.createFolder);

foldersRouter.get('/', controllers.getAllFolders);

foldersRouter.put('/:folderId', validateFolderName, controllers.changeFolderName);

foldersRouter.delete('/:folderId', controllers.deleteFolder);

// Routes related to
// File uploading and fetching

foldersRouter.post('/:folderId/files', controllers.uploadFiles);

foldersRouter.get('/:folderId/files', controllers.getFolderFiles);

// file download route
foldersRouter.get('/:folderId/files/:fileId', controllers.downloadFile);

export default foldersRouter;
