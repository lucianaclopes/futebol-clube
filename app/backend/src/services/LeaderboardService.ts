import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardAll from '../models/LeaderboardAll';

export default class LeaderboardService {
  private leaderboardModel = new LeaderboardModel();
  private leaderboardAll = new LeaderboardAll();

  public async getAllTeamsInfoPerformance(): Promise<ServiceResponse<ILeaderboard[]>> {
    const homeLeaderboard = await this.leaderboardModel.getHomeTeamsPerformance();

    return { status: 'SUCCESS', data: homeLeaderboard };
  }

  public async getAwayTeamsInfoPerformance(): Promise<ServiceResponse<ILeaderboard[]>> {
    const awayLeaderboard = await this.leaderboardModel.getAwayTeamsPerformance();

    return { status: 'SUCCESS', data: awayLeaderboard };
  }

  public async getLeaderBoard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeamsLeaderboard = await this.leaderboardAll.getAllTeamsPerfomance();
    return { status: 'SUCCESS', data: allTeamsLeaderboard };
  }
}
