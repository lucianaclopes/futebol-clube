import IMatch from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findMatchesInProgress(): Promise<IMatch[]>;
  findMatchesDone(): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
}
