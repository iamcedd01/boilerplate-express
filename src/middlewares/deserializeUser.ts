import AppError, { HttpCode } from '@helpers/appError';
import { verifyJwt } from '@helpers/jwt';
import User from '@models/user.model';
import { NextFunction, Request, Response } from 'express';

const deserializeUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    let accessToken = '';

    if (req.headers.authorization?.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.access_token) {
      accessToken = req.cookies.access_token;
    }

    if (!accessToken) {
      // eslint-disable-next-line quotes
      next(new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED }));
      return;
    }

    // Validate access token
    const decoded = verifyJwt<{ user: string }>(accessToken, 'accessToken');

    if (!decoded) {
      // eslint-disable-next-line quotes
      next(new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED }));
    }

    await User.findById(decoded?.user).then((user) => {
      if (user) {
        // req.currentUser = {
        //   id: user._id,
        // };
      } else {
        // eslint-disable-next-line quotes
        next(new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED }));
      }
    });

    next();
  } catch (err) {
    next(err);
  }
};

export default deserializeUser;
