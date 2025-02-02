import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findMatchesInProgress(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: true },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findMatchesDone(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatchInProgress(
    id: IMatch['id'],
    data: { homeTeamGoals: number, awayTeamGoals: number },
  ): Promise<IMatch | null> {
    const [affectedRows] = await this.model.update(
      { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
    if (affectedRows === 0) return null;
    const updatedMatch = await this.model.findByPk(id);
    return updatedMatch;
  }

  async createMatch(data: NewEntity<IMatch>): Promise<IMatch> {
    const newData = { ...data, inProgress: true };
    const newMatch = await this.model.create(newData);

    return newMatch;
  }
}
