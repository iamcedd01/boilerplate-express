import { IUser } from '@models/user.model';

export interface IAuthRegister extends IUser {
  confirmPassword: string;
  password: string;
}

export interface IAuthLogin extends Pick<IUser, 'email'> {
  password: string;
}
