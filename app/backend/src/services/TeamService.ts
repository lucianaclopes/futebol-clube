import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return {
      status: 'SUCCESS',
      data: allTeams,
    };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not found` },
      };
    }
    return {
      status: 'SUCCESS',
      data: team,
    };
  }
}
