import e, { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { User } from '../models';
import { logger } from '../../../utils/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../models/token';
import dotenv from 'dotenv';

export const register = async (req: Request, res: Response) => {
  dotenv.config();
  try {
    const { name, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.build({ name, lastname, email, password: hashedPassword });
    await user.save();
    createResponse(res, { success: true, data: user, statusCode: 201 });
  } catch (err: any) {
    logger('error', err, 'authController.register' , req.headers['user-agent']);
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createResponse(res, {
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
      });
      logger('error', 'Invalid credentials', 'authController.login' , req.headers['user-agent']);
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Store token in the database
    await Token.create({
      userId: user.id,
      token: token,
      expiryDate: new Date(Date.now() + 3600000), // 1 hour from now
    });

    //hide password
    user.password = '';
    createResponse(res, { success: true, data: { user, token} });
    logger('info', 'User logged in', 'authController.login' , req.headers['user-agent']);
  } catch (err: any) {
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'authController.login' , req.headers['user-agent']);
  }
};
