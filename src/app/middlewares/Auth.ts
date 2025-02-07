import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import loginConfig from '../../config/Login.ts';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, loginConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
