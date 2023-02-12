import secrets from '@config/secrets';
import jwt, { SignOptions } from 'jsonwebtoken';
import logger from './logger';

type TJwtKey = 'accessToken' | 'refreshToken';

export const signJwt = (payload: Object, key: TJwtKey, options: SignOptions = {}) => {
  const privateKey = Buffer.from(secrets[`${key}PrivateKey`], 'base64').toString('ascii');

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string, key: TJwtKey): T | null => {
  try {
    const publicKey = Buffer.from(secrets[`${key}PublicKey`], 'base64').toString('ascii');

    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
