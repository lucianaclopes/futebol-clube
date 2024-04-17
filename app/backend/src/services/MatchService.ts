import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { NewEntity } from '../Interfaces/index';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESS', data: allMatches };
  }

  public async getMatchesInProgress(): Promise<ServiceResponse<IMatch[]>> {
    const matchesInProgress = await this.matchModel.findMatchesInProgress();
    return { status: 'SUCCESS', data: matchesInProgress };
  }

  public async getMatchesDone(): Promise<ServiceResponse<IMatch[]>> {
    const matchesDone = await this.matchModel.findMatchesDone();
    return { status: 'SUCCESS', data: matchesDone };
  }

  public async finishMatch(id: number, decodedToken: string)
    : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id, decodedToken);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatchInProgress(
    id: number,
    data: { homeTeamGoals: number, awayTeamGoals: number },
    decodedToken: string,
  )
    : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatchInProgress(id, data, decodedToken);
    return { status: 'SUCCESS', data: { message: 'Updated' } };
  }

  public async createMatch(data: NewEntity<IMatch>, decodedToken: string)
    : Promise<ServiceResponse<IMatch>> {
    const newMatch = await this.matchModel.createMatch(data, decodedToken);
    return { status: 'SUCCESS', data: newMatch };
  }
}
