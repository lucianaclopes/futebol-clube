import { Router } from 'express';
import teamRouter from './team.route';
import loginRouter from './login.route';

const router = Router();
router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
