import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboarderController = new LeaderboardController();
const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboarderController
  .getAllTeamsInfoPerformance(req, res));

router.get('/away', (req: Request, res: Response) => leaderboarderController
  .getAwayTeamsInfoPerformance(req, res));

export default router;
