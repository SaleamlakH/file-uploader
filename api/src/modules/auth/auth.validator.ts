import { body, matchedData, validationResult } from 'express-validator';
import { prisma } from '../../lib/prisma';
import type { NextFunction, Request, Response } from 'express';

const isEmailExist = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (user) {
    throw new Error('Email already exist, please login');
  }
};

const emailValidator = () => {
  return body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Incorrect email format')
    .toLowerCase();
};

const passwordValidator = () => {
  return body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters');
};

const signupValidator = [emailValidator().custom(isEmailExist), passwordValidator()];
const loginValidator = [emailValidator(), passwordValidator()];

const handleValidationResult = (req: Request, res: Response, next: NextFunction) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors.array();

    return res.status(400).json({ validationErrors });
  }

  // get sanitized data
  const { email, password } = matchedData(req);

  req.body.email = email;
  req.body.password = password;
  next();
};

export const validateSignup = [signupValidator, handleValidationResult];
export const validateLogin = [loginValidator, handleValidationResult];
