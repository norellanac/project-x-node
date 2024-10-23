import e, { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { User } from '../models';
import { logger } from '../../../utils/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../models/token';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.build({ name, lastname, email, password: hashedPassword });
    await user.save();
    createResponse(res, { success: true, data: user, statusCode: 201 });
  } catch (err: any) {
    logger('error', err, 'authController.register', req.headers['user-agent']);
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
      logger('error', 'User not found', 'authController.login', req.headers['user-agent']);
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createResponse(res, {
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
      });
      logger('error', 'Invalid credentials', 'authController.login', req.headers['user-agent']);
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

    // Hide password
    user.password = '';
    createResponse(res, { success: true, data: { user, token } });
    logger('info', 'User logged in', 'authController.login', req.headers['user-agent']);
  } catch (err: any) {
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'authController.login', req.headers['user-agent']);
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      logger('error', 'User not found', 'authController.requestPasswordReset', req.headers['user-agent']);
      return;
    }

    // Generate password reset token with 10 minutes expiration
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '10m' });

    // Store reset token in the database
    await Token.create({
      userId: user.id,
      token: resetToken,
      expiryDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    });

    // Send password reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    createResponse(res, { success: true, message: 'Password reset email sent' });
    logger('info', 'Password reset email sent', 'authController.requestPasswordReset', req.headers['user-agent']);
  } catch (err: any) {
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'authController.requestPasswordReset', req.headers['user-agent']);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const storedToken = await Token.findOne({ where: { token: token } });
    if (!storedToken) {
      createResponse(res, {
        success: false,
        message: 'Invalid or expired token',
        statusCode: 400,
      });
      logger('error', 'Invalid or expired token', 'authController.resetPassword', req.headers['user-agent']);
      return;
    }

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      logger('error', 'User not found', 'authController.resetPassword', req.headers['user-agent']);
      return;
    }

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Invalidate the token
    await storedToken.destroy();

    createResponse(res, { success: true, message: 'Password reset successful' });
    logger('info', 'Password reset successful', 'authController.resetPassword', req.headers['user-agent']);
  } catch (err: any) {
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'authController.resetPassword', req.headers['user-agent']);
  }
};