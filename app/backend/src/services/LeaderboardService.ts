import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  private leaderboardModel = new LeaderboardModel();

  public async getAllTeamsInfoPerformance(): Promise<ServiceResponse<ILeaderboard[]>> {
    const homeLeaderboard = await this.leaderboardModel.getHomeTeamsPerformance();

    return { status: 'SUCCESS', data: homeLeaderboard };
  }
}
