import User from '@models/user.model';
import { body } from 'express-validator';

export const createUserSchema = [
  body('email')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('is required')
    .bail()
    .isEmail()
    .custom(async (value: string) => {
      await User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email already exists');
        }
      });
    }),
  body('firstName').notEmpty({ ignore_whitespace: true }),
  body('lastName').notEmpty({ ignore_whitespace: true }),
  body('password').notEmpty({ ignore_whitespace: true }),
];

export const loginSchema = [
  body('email').notEmpty({ ignore_whitespace: true }).withMessage('is required').isEmail(),
  body('password').notEmpty({ ignore_whitespace: true }).withMessage('is required'),
];
