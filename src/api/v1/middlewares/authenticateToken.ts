import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Token from '../models/token';
import { logger, LOGGER_EVENTS } from '../../../utils/logger';
import { AuthUserIdRequest } from './types';

export const authenticateToken = async (req: AuthUserIdRequest, res: Response, next: NextFunction) => {
  const start = Date.now();
  const requestBody = JSON.parse(JSON.stringify(req.body));
  let responseBody = {};
  let requestByUser: { email: string; id: string | number ; } = { email: '', id: '' };

  const originalSend = res.send.bind(res);
  res.send = (body) => {
    responseBody = JSON.parse(JSON.stringify(body));
    return originalSend(body);
  };

  let token = req.headers['authorization'];
  if (!token) {
    logger(LOGGER_EVENTS.INFO, { message: 'No token provided' }, 'authenticateToken', req.headers['user-agent']);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  // Handle "Bearer <token>" format
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  const storedToken = await Token.findOne({ 
    where: { token: token }, 
    include: { association: 'user' } 
  });

  const {email, id: userId} = storedToken?.user ? storedToken.user.toJSON() : { email: '', id: '' };
	requestByUser = { email, id: userId ? userId.toString() : '' };

  type DecodedToken = {
    userId: number;
    iat: number;
    exp: number;
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === 'string') {
      logger(LOGGER_EVENTS.INFO, { message: 'Invalid token format' }, 'authenticateToken', req.headers['user-agent']);
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    if (!storedToken) {
      logger(LOGGER_EVENTS.INFO, { message: 'Token not found in database' }, 'authenticateToken', req.headers['user-agent']);
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Check if it's an ACCESS token if it has a type
    if (storedToken.type && storedToken.type !== 'ACCESS') {
      logger(LOGGER_EVENTS.INFO, { message: 'Invalid token type used for authentication' }, 'authenticateToken', req.headers['user-agent']);
      return res.status(401).json({ success: false, message: 'Invalid token type' });
    }

    req.userId = (decoded as DecodedToken).userId;
    logger(LOGGER_EVENTS.INFO, { message: 'Token authenticated successfully', decoded, storedToken: storedToken.toJSON() }, 'authenticateToken', req.headers['user-agent'], requestByUser.email, requestByUser.id.toString());
    next();
  } catch (err) {
    logger(LOGGER_EVENTS.ERROR, { message: 'Token verification failed', error: err }, 'authenticateToken', req.headers['user-agent'], requestByUser.email, requestByUser.id.toString());
    return res.status(403).json({ success: false, message: 'Forbidden' });
  } finally {
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logInfo = {
        request: {
          method: req.method,
          url: req.originalUrl,
          headers: req.headers,
          body: requestBody,
        },
        response: {
          statusCode: res.statusCode,
          headers: res.getHeaders(),
          body: responseBody,
          responseTime: duration,
        },
      };

      logger(LOGGER_EVENTS.DEBUG, logInfo, 'HTTP Request and Response', req.headers['user-agent'], requestByUser.email || '' , requestByUser.id.toString() || '');
    });
  }
};