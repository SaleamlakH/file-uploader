import { Router } from 'express';
import * as authController from './auth.controller';
import { validateLogin, validateSignup } from './auth.validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { getUserByEmail, getUserById } from './auth.service';

// authentication verifier
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      // fetch user
      try {
        const user = await getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // compare password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

// serialize and deserialize authenticated user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const authRouter = Router();

authRouter.post('/signup', ...validateSignup, authController.signup);

authRouter.post('/login', ...validateLogin, authController.authenticateLogin);

authRouter.get('/logout', authController.logout);

export default authRouter;
