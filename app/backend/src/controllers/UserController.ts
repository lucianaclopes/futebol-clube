import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    return res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }

  public async findByRole(req: Request, res: Response): Promise<Response> {
    const decodedToken = req.headers.authorization?.split(' ')[1];
    const serviceResponse = await this.userService.findByRole(decodedToken as string);

    return res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
