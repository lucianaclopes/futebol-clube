import { Response, Request, Router } from 'express';
import UserController from '../controllers/UserController';
import ValidationsMiddleware from '../middlewares/validationsMiddleware';

const userController = new UserController();
const router = Router();

router.post(
  '/',
  ValidationsMiddleware.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  ValidationsMiddleware.validateToken,
  (req: Request, res: Response) => userController.findByRole(req, res),
);
export default router;
