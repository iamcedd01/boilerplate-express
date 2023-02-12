import * as crypto from 'crypto';
import { Document, model, Model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUserModel extends IUser, Document {
  setPassword: (password: string) => void;
  verifyPassword: (password: string) => boolean;
}

export type IUserDocument = IUserModel;

const UserSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      lowercase: true,
      unique: true,
      required: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    firstName: {
      lowercase: true,
      required: true,
      type: Schema.Types.String,
    },
    lastName: {
      lowercase: true,
      required: true,
      type: Schema.Types.String,
    },
    hash: Schema.Types.String,
    salt: Schema.Types.String,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.verifyPassword = function (password: string) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default User;
