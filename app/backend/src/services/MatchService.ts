import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESS', data: allMatches };
  }
}
