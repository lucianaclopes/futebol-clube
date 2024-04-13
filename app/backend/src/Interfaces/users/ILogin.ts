import { Identifiable } from '..';
import IUser from './IUser';

export interface ILogin {
  email: string;
  password: string;
}

export interface IIUser extends Identifiable, ILogin {
  username: string;
  role: string;
}

export type IUserResponse = Omit<IUser, 'password'>;

export interface IRole {
  role: string;
}
