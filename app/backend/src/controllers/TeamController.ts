import { Request, Response } from 'express';
import mapStatusHttp from '../utils/mapStatusHttp';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  public async getAllTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
