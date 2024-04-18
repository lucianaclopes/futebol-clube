import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboarderController = new LeaderboardController();
const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboarderController
  .getAllTeamsInfoPerformance(req, res));

export default router;
