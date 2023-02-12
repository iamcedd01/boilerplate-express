import config from '@config/index';
import AppError, { HttpCode } from '@helpers/appError';
import { signJwt } from '@helpers/jwt';
import User, { IUserModel } from '@models/user.model';
import { IAuthLogin, IAuthRegister } from 'interface/auth';

export const signToken = (user: IUserModel) => {
  // Sign the access token
  const accessToken = signJwt({ sub: user._id }, 'accessToken', {
    expiresIn: `${config.accessTokenExpiresIn}m`,
  });

  // Sign the refresh token
  const refreshToken = signJwt({ sub: user.id }, 'refreshToken', {
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
