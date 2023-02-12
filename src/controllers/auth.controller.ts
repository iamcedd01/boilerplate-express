/* eslint-disable @typescript-eslint/no-misused-promises */
import config from '@config/index';
import validator from '@middlewares/validators';
import { createUserSchema, loginSchema } from '@middlewares/validators/auth.schema';
import { handleLogin, handleRegister } from '@services/auth.services';
import { CookieOptions, NextFunction, Request, Response, Router } from 'express';
import { IAuthLogin, IAuthRegister } from 'interface/auth';

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.accessTokenExpiresIn * 60 * 1000),
  maxAge: config.accessTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.refreshTokenExpiresIn * 60 * 1000),
  maxAge: config.refreshTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const router = Router();

router.post('/register', createUserSchema, validator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as IAuthRegister;
    const user = await handleRegister(body);

    return res.status(201).json({ message: 'Account created successfully', data: user });
  } catch (err) {
    next(err);
  }
});

router.post('/login', loginSchema, validator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = await handleLogin(req.body as IAuthLogin);

    res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);
    res.cookie('logged_in', true, { ...accessTokenCookieOptions, httpOnly: false });

    return res.status(200).json({ access_token: accessToken });
  } catch (err) {
    next(err);
  }
});

export default router;
