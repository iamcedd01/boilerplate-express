import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import { JWT_SECRET } from '@config/secrets';

function splitToken(authString: string) {
  return authString.split(' ')[0] === 'Token' ? authString.split(' ')[1] : undefined;
}

function getTokenFromHeader(req: Request): string | undefined {
  const headerAuth: string | string[] = req.headers?.authorization ?? '';
  return headerAuth ? splitToken(Array.isArray(headerAuth) ? headerAuth[0] : headerAuth) : undefined;
}

const authentication = {
  optional: [
    jwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      getToken: getTokenFromHeader,
      requestProperty: 'payload',
      secret: JWT_SECRET,
    }),
  ],
  required: [
    jwt({
      algorithms: ['HS256'],
      credentialsRequired: true,
      getToken: getTokenFromHeader,
      requestProperty: 'payload',
      secret: JWT_SECRET,
    }),
  ],
};

export default authentication;
