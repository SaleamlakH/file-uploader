import { Router } from 'express';
import * as authController from './auth.controller';
import { validateLogin, validateSignup } from './auth.validator';

const authRouter = Router();

authRouter.post('/signup', ...validateSignup, authController.signup);

authRouter.post('/login', ...validateLogin, authController.authenticateLogin);

export default authRouter;
