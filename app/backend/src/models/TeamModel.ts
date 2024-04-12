import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private _model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this._model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this._model.findByPk(id);
    if (dbData === null) return null;
    const { teamName }:ITeam = dbData;
    return { id, teamName };
  }
}
