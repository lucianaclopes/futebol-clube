import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findMatchesInProgress(): Promise<IMatch[]>;
  findMatchesDone(): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
  updateMatchInProgress(id:IMatch['id'],
    data: { homeTeamGoals: number, awayTeamGoals: number }): Promise<IMatch | null>;
  createMatch(data: Partial<IMatch>): Promise<IMatch>;
}
