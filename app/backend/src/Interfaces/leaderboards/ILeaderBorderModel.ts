import { ILeaderboard } from './ILeaderboard';

export interface ILeaderBoardModel {
  getAllTeamsInfoPerformance(): Promise<ILeaderboard[]>;
}
