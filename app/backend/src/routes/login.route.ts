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
export default router;
