import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth';

const foldersRouter = Router();

// check authorization
foldersRouter.use('/', requireAuth);

export default foldersRouter;
