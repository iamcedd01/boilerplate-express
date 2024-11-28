import config from '@config/index';
import AppError, { HttpCode } from '@helpers/appError';
import { signJwt } from '@helpers/jwt';
import { IAuthLogin, IAuthRegister } from '@interfaces/IAuth';
import User, { IUserModel } from '@models/user.model';

export const signToken = (user: IUserModel) => {
  // Sign the access token
  const accessToken = signJwt({ user: user._id }, 'accessToken', {
    expiresIn: `${config.accessTokenExpiresIn}m`,
  });

  // Sign the refresh token
  const refreshToken = signJwt({ user: user.id }, 'refreshToken', {
    expiresIn: `${config.refreshTokenExpiresIn}m`,
  });

  return { accessToken, refreshToken };
};

export const handleRegister = async (body: Omit<IAuthRegister, 'confirmPassword'>): Promise<IUserModel> => {
  const { password, ...user } = body;

  const newUser = new User(user);
  newUser.setPassword(password);

  await newUser.save();

  return newUser;
};

export const handleLogin = async (body: IAuthLogin) => {
  return await User.findOne({ email: body.email }).then((user) => {
    if (!user?.verifyPassword(body.password)) {
      throw new AppError({ description: 'Invalid email or password', httpCode: HttpCode.UNAUTHORIZED });
    }

    return signToken(user);
  });
};

export const handleVerifyToken = async (userId?: string) => {
  const user = await User.findById(userId);

  if (!user) {
    // eslint-disable-next-line quotes
    throw new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED });
  }

  return true;
};

export const handleRefreshToken = async (userId?: string) => {
  const user = await User.findById(userId);

  if (!user) {
    // eslint-disable-next-line quotes
    throw new AppError({ description: "Invalid token or user doesn't exist", httpCode: HttpCode.UNAUTHORIZED });
  }

  return signJwt({ userId: user._id }, 'accessToken', {
    expiresIn: `${config.accessTokenExpiresIn}m`,
  });
};
