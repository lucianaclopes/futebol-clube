import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

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

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }
}
