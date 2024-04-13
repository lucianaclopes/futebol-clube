import SequelizeUser from '../database/models/SequelizeUser';
import { IIUser } from '../Interfaces/users/ILogin';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async findById(id: IIUser['id']): Promise<IIUser | null> {
    const user = await this._model.findByPk(id);
    if (!user) return null;
    const { username, role, email, password } = user;
    return { id, username, role, email, password };
  }

  async findByEmail(email: IIUser['email']): Promise<IIUser | null> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
