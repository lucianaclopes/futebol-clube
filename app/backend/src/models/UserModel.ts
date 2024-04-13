import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
