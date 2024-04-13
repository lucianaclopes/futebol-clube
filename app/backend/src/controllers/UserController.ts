import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) {}

  public login = async (req: Request, res: Response) => {
    const serviceResponse = await this.userService.login(req.body);
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  };
}
