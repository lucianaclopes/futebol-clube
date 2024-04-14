import { Request, Response } from 'express';
import mapStatusHttp from '../utils/mapStatusHttp';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let serviceResponse;
    if (inProgress === 'true') {
      serviceResponse = await this.matchService.getMatchesInProgress();
    } else if (inProgress === 'false') {
      serviceResponse = await this.matchService.getMatchesDone();
    } else {
      serviceResponse = await this.matchService.getAllMatches();
    }
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
