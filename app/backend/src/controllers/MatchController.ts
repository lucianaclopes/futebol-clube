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

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { decodedToken } = req.body;
    const serviceResponse = await this.matchService.finishMatch(Number(id), decodedToken);
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals, decodedToken } = req.body;
    const serviceResponse = await this.matchService.updateMatchInProgress(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    }, decodedToken);
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const { decodedToken } = req.body;
    const serviceResponse = await this.matchService.createMatch(req.body, decodedToken);
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
