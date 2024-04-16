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
    const serviceResponse = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatchInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchService.updateMatchInProgress(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    });
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchService.createMatch(req.body);
    res.status(mapStatusHttp(serviceResponse.status)).json(serviceResponse.data);
  }
}
