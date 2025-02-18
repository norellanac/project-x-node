import { Response, NextFunction } from "express";
import { User, Role, Permission } from "../models";
import { AuthUserIdRequest } from "./types";

export const authorizePermission = (action: string, resource: string) => {
  return async (req: AuthUserIdRequest, res: Response, next: NextFunction) => {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    try {
      const user = await User.findByPk(req.userId, {
        include: {
          model: Role,
          as: "roles",
          include: [{ model: Permission, as: "permissions" }],
        },
      });

      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      // Check if user has the required permission
      const hasPermission = user.roles?.some(role =>
        role.permissions.some(permission =>
          permission.action === action && permission.resource === resource
        )
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Access Denied" });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
