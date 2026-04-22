import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import type { IVerifyOptions } from 'passport-local';
import { createUserWithDefaultFolder } from './auth.service';
import type { Users } from '../../../generated/prisma/client';

// signup form
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // create account with default folder
    const { email, password }: Users = req.body;
    const user = await createUserWithDefaultFolder(email, password);

    // login and send user data
    req.login(user, (err) => {
      if (err) {
        throw err;
      }

      // send user info including default folder
      res.json(user);
    });
  } catch (error) {
    next(error);
  }
};

const authenticateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await passport.authenticate(
      'local',
      (error: any, user: Express.User | false | undefined, info: IVerifyOptions) => {
        if (error) return next(error);

        // login
        if (user) {
          return req.login(user, (err) => {
            if (err) return next(error);

            // send user data
            res.json(user);
          });
        }

        // authentication error message
        if (info) {
          res.status(400).json({ message: info.message });
        }
      },
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);

    // also delete it from store
    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};

export { signup, authenticateLogin, logout };
