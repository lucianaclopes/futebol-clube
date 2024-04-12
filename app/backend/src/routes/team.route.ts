import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();
const teamController = new TeamController();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;
