import { Request, Response, NextFunction } from 'express';

// Extend the Express Request type to include the pagination object
declare global {
  namespace Express {
    interface Request {
      pagination?: {
        limit: number;
        offset: number;
      };
    }
  }
}

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const offset = parseInt(req.query.offset as string, 10) || 0;

  // Cap the maximum limit to prevent abuse
  req.pagination = {
    limit: Math.min(limit, 100), // Max limit is 100
    offset: Math.max(offset, 0),
  };

  next();
};
