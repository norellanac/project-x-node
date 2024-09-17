import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/token';
import dotenv from 'dotenv';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  dotenv.config();
  const token = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  type DecodedToken = {
    userId: number;
    iat: number;
    exp: number;
  };
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === 'string') {
      return res.sendStatus(403); // Forbidden
    }
    const userDecoded = decoded as DecodedToken;
    const storedToken = await Token.findOne({ where: { token: token } });
    if (!storedToken) return res.sendStatus(401); // Unauthorized

    req.body.user_id = userDecoded.userId;

  console.log('===DEBUG===: ', storedToken.userId, userDecoded.userId, req.body.user_id);
    next();
  } catch (err) {
    return res.sendStatus(403); // Forbidden
  }
};