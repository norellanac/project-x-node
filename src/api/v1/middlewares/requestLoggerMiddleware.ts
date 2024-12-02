import { Request, Response, NextFunction } from "express";
import { logger, LOGGER_EVENTS } from "../../../utils/logger";
import { Token } from "../models";

export const httpLoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const requestBody = JSON.parse(JSON.stringify(req.body));
  let responseBody = {};

  const originalSend = res.send.bind(res);
  res.send = (body) => {
	responseBody = JSON.parse(JSON.stringify(body));
	return originalSend(body);
  };

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
	  }
	};

	logger(LOGGER_EVENTS.INFO, logInfo, 'HTTP Request and Response', req.headers['user-agent'], requestBody?.email);
  });

  next();
};