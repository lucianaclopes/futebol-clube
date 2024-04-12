import IMatch from './IMatch';

export interface IMatchModel {
  create(data:Partial<IMatch>): Promise<IMatch>,
}
