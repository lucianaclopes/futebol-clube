import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/users/IUserModel';
import JWT from '../utils/jwtUtil';
import { ILogin, IRole } from '../Interfaces/users/ILogin';
import IUser from '../Interfaces/users/IUser';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/users/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(data:ILogin):Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESS', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  }

  public async findByRole(decodedToken:string):Promise<ServiceResponse<IRole>> {
    const validateToken = this.jwtService.verify(decodedToken) as JwtPayload;
    const user = await this.userModel.findByEmail(validateToken.email);

    const { role } = user as IRole;
    if (!user || user === null) {
      return { status: 'UNAUTHORIZED', data: { message: 'user not found' } };
    }
    return { status: 'SUCCESS', data: { role } };
  }
}
