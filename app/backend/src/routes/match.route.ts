import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import ValidationsMiddleware from '../middlewares/validationsMiddleware';

const router = Router();
const matchController = new MatchController();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  ValidationsMiddleware.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  ValidationsMiddleware.validateToken,
  (req: Request, res: Response) => matchController.updateMatchInProgress(req, res),
);

router.post(
  '/',
  ValidationsMiddleware.validateToken,
  ValidationsMiddleware.validateMatch,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
