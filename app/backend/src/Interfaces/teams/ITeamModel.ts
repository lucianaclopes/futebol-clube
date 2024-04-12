import ITeam from './ITeam';

export interface ITeamModel {
  create(data:Partial<ITeam>): Promise<ITeam>,
}
