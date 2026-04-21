import { Router } from 'express';
import { validateLogin, validateSignup } from './auth.validator';

const authRouter = Router();

authRouter.post('/signup', ...validateSignup);

authRouter.post('/login', ...validateLogin);

export default authRouter;
