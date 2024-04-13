import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/jwtUtil';

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

  static async validateToken(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenSplittedBearer = token.split(' ')[1];
    const validToken = await JWT.verify(tokenSplittedBearer);
    req.body = validToken;
    if (validToken === 'Token must be a valid token') {
      return res.status(401).json({ message: validToken });
    }
    next();
  }
}

export default ValidationsMiddleware;
