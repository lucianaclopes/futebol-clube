import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);
    console.log('Service Response:', serviceResponse);
    return res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
