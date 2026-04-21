import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { prisma } from './lib/prisma';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

const app = express();

// parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register session middle wares
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
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

// authentication verifier
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      // fetch user
      try {
        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // compare password
        const match = await bcrypt.compare(password, user.id);
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
    const user = await prisma.users.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started at port 3000');
});
