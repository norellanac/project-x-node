import { Response, NextFunction } from 'express';
import { User, Role } from '../models';
import { AuthUserIdRequest } from './types';

export const authorizeRole = (allowedRoles: string[]) => {
  return async (req: AuthUserIdRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    try {
      const user = await User.findByPk(req.userId, {
        include: [{ model: Role, as: 'roles' }],
      });

      if (!user) {
        return res
          .status(403)
          .json({ message: 'Access Denied: User not found' });
      }
      if (
        !user.roles ||
        !user.roles.some((role) => allowedRoles.includes(role.name))
      ) {
        return res
          .status(403)
          .json({ message: 'Access Denied: Role not allowed' });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
