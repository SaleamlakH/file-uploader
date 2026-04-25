import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma';
import passport from 'passport';
import authRouter from './modules/auth/auth.route';
import foldersRouter from './modules/folders/folders.route';
import sharesRouter from './modules/shares/shares.route';

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started at port 3000');
});
