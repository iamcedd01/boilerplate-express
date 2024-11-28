/* eslint-disable @typescript-eslint/no-misused-promises */
import config from '@config/index';
import AppError, { HttpCode } from '@helpers/appError';
import { verifyJwt } from '@helpers/jwt';
import { IAuthLogin, IAuthRegister } from '@interfaces/IAuth';
import { registerAccountLimiter } from '@middlewares/limiters';
import validator from '@middlewares/validators';
import { createUserSchema, loginSchema } from '@middlewares/validators/auth.schema';
import { handleLogin, handleRefreshToken, handleRegister, handleVerifyToken } from '@services/auth.service';
import { CookieOptions, NextFunction, Request, Response, Router } from 'express';

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.accessTokenExpiresIn * 60 * 1000),
  maxAge: config.accessTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + config.refreshTokenExpiresIn * 60 * 1000),
  maxAge: config.refreshTokenExpiresIn * 60 * 1000,
  secure: true,
  httpOnly: true,
  sameSite: 'lax',
};

const router = Router();

router.post(
  '/register',
  registerAccountLimiter,
  createUserSchema,
  validator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as IAuthRegister;
      const user = await handleRegister(body);

      return res.status(201).json({ message: 'Account created successfully', data: user });
    } catch (err) {
      next(err);
    }
  }
);

router.post('/login', loginSchema, validator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken } = await handleLogin(req.body as IAuthLogin);

    // res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);
    res.cookie('logged_in', true, { ...accessTokenCookieOptions, httpOnly: false });

    return res.status(200).json({ access_token: accessToken });
  } catch (err) {
    next(err);
  }
});

router.post('/verify-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = await handleVerifyToken(verifyJwt<{ user: string }>(req.body.access_token, 'accessToken')?.user);
    return res.status(200).json({ is_valid: isValid });
  } catch (err) {
    next(err);
  }
});

router.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) {
      // eslint-disable-next-line quotes
      next(new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED }));
    }

    const accessToken = await handleRefreshToken(
      verifyJwt<{ user: string }>(cookies.refresh_token, 'refreshToken')?.user
    );

    return res.status(200).json({ access_token: accessToken });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.refresh_token) {
      return res.sendStatus(HttpCode.NO_CONTENT);
    }

    res.clearCookie('refresh_token', {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;
