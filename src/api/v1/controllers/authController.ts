import e, { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { User } from '../models';

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
      return;
    }
    if (user.password !== password) {
      createResponse(res, {
        success: false,
        message: 'Invalid credentials',
        statusCode: 400,
      });
      return;
    }
    //hide password
    user.password = '';
    createResponse(res, { success: true, data: user });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
};
