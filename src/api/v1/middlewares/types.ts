import { Request } from "express";

export interface AuthUserIdRequest extends Request {
  userId?: string | number;
}
