import AppError, { HttpCode } from '@helpers/appError';
import { verifyJwt } from '@helpers/jwt';
import { NextFunction, Request, Response } from 'express';

const deserializeUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    let accessToken = '';

    if (req.headers.authorization?.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.access_token) {
      accessToken = req.cookies.access_token;
    }

    console.log({ headers: req.headers, cookies: req.cookies });

    if (!accessToken) {
      next(new AppError({ description: 'You are not logged in', httpCode: HttpCode.UNAUTHORIZED }));
      return;
    }

    // Validate access token
    const decoded = verifyJwt<{ sub: string }>(accessToken, 'accessToken');

    if (!decoded) {
      // eslint-disable-next-line quotes
      next(new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED }));
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default deserializeUser;
