import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public getAllTeamsInfoPerformance = async (req: Request, res: Response) => {
    const serviceResponse = await this.leaderboardService.getAllTeamsInfoPerformance();
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  };
}
