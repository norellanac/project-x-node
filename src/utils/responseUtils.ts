import { Response } from 'express';
import { STATUS_CODES, MESSAGES } from './constants';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { msg: string }[];
}

export const createResponse = <T>(
  res: Response,
  options: {
    success: boolean;
    message?: string;
    data?: T;
    errors?: { msg: string }[]; // Update the type of errors
    statusCode?: number;
  }
): void => {
  const { success, message, data, errors, statusCode } = options;
  const response: ApiResponse<T> = {
    success,
    message: message || (success ? MESSAGES.SUCCESS : MESSAGES.INTERNAL_SERVER_ERROR),
    data,
    errors
  };
  res.status(statusCode || (success ? STATUS_CODES.OK : STATUS_CODES.INTERNAL_SERVER_ERROR)).json(response);
};
