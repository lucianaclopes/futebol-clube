import { IIUser } from './ILogin';
// import { ICRUDModelReader } from '../ICRUDModel';

export interface IUserModel {
  findByEmail(email: IIUser['email']): Promise<IIUser | null>;
}
