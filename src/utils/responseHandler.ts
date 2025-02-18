import { Response } from 'express';

type Pagination = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

type ApiResponse<T = any> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
};

type PaginatedResponse<T = any> = {
  items: T[];
  pagination: Pagination;
};

const defaultMessages: Record<number, string> = {
  200: "Success",
  201: "Resource created successfully",
  204: "No content",
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Resource not found",
  409: "Conflict",
  422: "Validation error",
  500: "Internal server error",
};

export const sendApiResponse = <T>(
  res: Response,
  success: boolean,
  statusCode: number,
  data?: T,
  message?: string
) => {
  const response: ApiResponse<T> = {
    success,
    statusCode,
    message: message || defaultMessages[statusCode] || "Unknown status",
    ...(data !== undefined ? { data } : {}),
  };

  if (statusCode === 204) {
    return res.status(204).send(); // No content response
  }

  return res.status(statusCode).json(response);
};