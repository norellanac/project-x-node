import e, { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { User } from '../models';
import { logger } from '../../../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    const user = User.build({ name, lastname, email, password });
    await user.save();
    createResponse(res, { success: true, data: user, statusCode: 201 });
  } catch (err: any) {
    console.error('**Error**: ', err);
    err.errors
      ? createResponse(res, {
          success: false,
          errors: err.errors,
          statusCode: 400,
        })
      : createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      logger('error', 'User not found', 'authController.login' , req.headers['user-agent']);
      return;
    }
    if (user.password !== password) {
      createResponse(res, {
        success: false,
        message: 'Invalid credentials',
        statusCode: 400,
      });
      logger('error', 'Invalid credentials', 'authController.login' , req.headers['user-agent']);
      return;
    }
    //hide password
    user.password = '';
    createResponse(res, { success: true, data: user });
    logger('info', 'User logged in', 'authController.login' , req.headers['user-agent']);
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'authController.login' , req.headers['user-agent']);
  }
};
