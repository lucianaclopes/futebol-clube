import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public getAllTeamsInfoPerformance = async (req: Request, res: Response) => {
    const serviceResponse = await this.leaderboardService.getAllTeamsInfoPerformance();
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  };

  public getAwayTeamsInfoPerformance = async (req: Request, res: Response) => {
    const serviceResponse = await this.leaderboardService.getAwayTeamsInfoPerformance();
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  };

  public getLeaderboard = async (req: Request, res: Response) => {
    const serviceResponse = await this.leaderboardService.getLeaderBoard();
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  };
}
