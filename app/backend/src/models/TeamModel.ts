import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
// import { NewEntity } from '../Interfaces/index';

export default class TeamModel implements ITeamModel {
  private _model = SequelizeTeam;

  // async create(data: NewEntity<ITeam>): Promise<ITeam> {
  //   const dbData = await this._model.create(data);
  //   const { id, teamName }: ITeam = dbData;
  //   return { id, teamName };
  // }

  async findAll(): Promise<ITeam[]> {
    const dbData = await this._model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}
