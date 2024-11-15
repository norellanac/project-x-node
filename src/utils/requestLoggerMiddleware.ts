import { Request, Response, NextFunction } from "express";
import { logger, LOGGER_EVENTS } from "./logger";
import { Token } from "../api/v1/models";
// * This code File can be deleted, http logs are now in middleware/authenticateToken.ts

export const httpLoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  let requestByUser: { email: string; id: string; };
  if (token) {
	const tokenInfo = await Token.findOne({ where: { token }, include: {association: 'user'} });
	const {email, id} = tokenInfo?.user ? tokenInfo.user.toJSON() : { email: '', id: '' };
	requestByUser = { email, id: id.toString() };
  }

  //const requestByUser = token ? Token.findOne({ where: { token }, include: {association: 'user'} }) : null;
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

	logger(LOGGER_EVENTS.INFO, logInfo, 'HTTP Request and Response', req.headers['user-agent'], requestByUser.email, requestByUser.id,);
  });

  next();
};