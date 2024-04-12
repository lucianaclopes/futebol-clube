import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { NewEntity } from '../Interfaces/index';

export default class UserModel implements IUserModel {
  private _model = SequelizeUser;

  async create(data: NewEntity<IUser>): Promise<IUser> {
    const user = await this._model.create(data);
    const { id, username, role, email, password } = user;
    return { id, username, role, email, password };
  }

  async findAll(): Promise<IUser[]> {
    const dbData = await this._model.findAll();
    return dbData.map(({ id, username, role, email, password }) => (
      { id, username, role, email, password }));
  }

  async findById(id: IUser['id']): Promise<IUser | null> {
    const user = await this._model.findByPk(id);
    if (!user) return null;
    const { username, role, email, password } = user;
    return { id, username, role, email, password };
  }

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
