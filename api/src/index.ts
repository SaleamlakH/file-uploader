import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma.js';
import passport from 'passport';
import authRouter from './modules/auth/auth.route.js';
import foldersRouter from './modules/folders/folders.route.js';
import sharesRouter from './modules/shares/shares.route.js';
import { sendError } from './errors/sendError.js';
import cors from 'cors';

const app = express();

// access-control
app.use(
  cors({
    origin: process.env.CORS_ORIGINS.split(','),
    credentials: true,
  }),
);

// parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register session middle wares
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // one week
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
      dbRecordIdIsSessionId: true,
    }),
  }),
);

app.use(passport.session());

// routes
app.use('/auth', authRouter);

app.use('/folders', foldersRouter);

app.use('/shares', sharesRouter);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  sendError(res, 500, 'Internal server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started at port 3000');
});
