import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findMatchesInProgress(): Promise<IMatch[]>;
  findMatchesDone(): Promise<IMatch[]>;
  finishMatch(id: number, decodedToken: string): Promise<void>;
  updateMatchInProgress(id: IMatch['id'],
    data: { homeTeamGoals: number, awayTeamGoals: number },
    decodedToken: string
  ): Promise<IMatch | null>;
  createMatch(data: Partial<IMatch>, decodedToken: string): Promise<IMatch>;
}
