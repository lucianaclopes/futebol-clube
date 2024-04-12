import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';
// import { NewEntity } from '../Interfaces/index';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  // public async createTeam(team: NewEntity<ITeam>): Promise<ServiceResponse<ITeam>> {
  //   const newBook = await this.teamModel.create(team);
  //   return { status: 'SUCCESS', data: newBook };
  // }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return {
      status: 'SUCCESS',
      data: allTeams,
    };
  }
}
