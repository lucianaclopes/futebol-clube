import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/jwtUtil';
import checkTeamsExist from '../utils/checkTeamsExist';

class ValidationsMiddleware {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenSplittedBearer = token?.split(' ')[1];
    const validToken = await JWT.verify(tokenSplittedBearer as string);

    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    req.body.decodedToken = validToken;
    next();
  }

  static async validateMatch(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const homeTeamExists = await checkTeamsExist(Number(homeTeamId));
    const awayTeamExists = await checkTeamsExist(Number(awayTeamId));

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return next();
  }
}

export default ValidationsMiddleware;
