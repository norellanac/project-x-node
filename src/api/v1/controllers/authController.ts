import { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { User } from '../models';
import { logger } from '../../../utils/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from '../models/token';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex'); // Generates a 6-character OTP
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    logger('info', `Registering user with email: ${email}`, 'authController.register', req.headers['user-agent'], email);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.build({ name, lastname, email, password: hashedPassword });
    await user.save();
    logger('info', `User registered successfully with email: ${email}`, 'authController.register', req.headers['user-agent'], email, user.id.toString());
    createResponse(res, { success: true, data: user, statusCode: 201 });
  } catch (err: any) {
    logger('error', err, 'authController.register', req.headers['user-agent'], req.body.email);
    err.errors
      ? createResponse(res, {
          success: false,
          errors: err.errors.map((e: any) => e.message),
          statusCode: 400,
        })
      : createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    logger('info', `Attempting to login user with email: ${email}`, 'authController.login', req.headers['user-agent'], email);
    const user = await User.scope('withPassword').findOne({ where: { email } });

    if (!user) {
      logger('error', `User not found with email: ${email}`, 'authController.login', req.headers['user-agent'], email);
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      logger('error', `Invalid password for user with email: ${email}`, 'authController.login', req.headers['user-agent'], email);
      createResponse(res, {
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
      });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '12h' });

    await Token.create({
      userId: user.id,
      token: token,
      expiryDate: new Date(Date.now() + 3600000), // 1 hour from now
    });

    user.password = '';
    logger('info', `User logged in successfully with email: ${email}`, 'authController.login', req.headers['user-agent'], email, user.id.toString());
    createResponse(res, { success: true, data: { user, token } });
  } catch (err: any) {
    logger('error', err, 'authController.login', req.headers['user-agent'], email);
    createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    logger('info', `Requesting password reset for email: ${email}`, 'authController.requestPasswordReset', req.headers['user-agent'], email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger('error', `User not found with email: ${email}`, 'authController.requestPasswordReset', req.headers['user-agent'], email);
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }

    const otp = generateOTP();
    const expiryDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await Token.create({
      userId: user.id,
      token: otp,
      expiryDate: expiryDate,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Use the following OTP to reset your password: ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    logger('info', `Password reset email sent to: ${email}`, 'authController.requestPasswordReset', req.headers['user-agent'], email);
    createResponse(res, { success: true, message: 'Password reset email sent' });
  } catch (err: any) {
    logger('error', err, 'authController.requestPasswordReset', req.headers['user-agent']);
    createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  logger('info', 'ResetPassword function called', 'authController.resetPassword', req.headers['user-agent'], req.body.email);
  try {
    const { otp, newPassword } = req.body;
    logger('info', `Resetting password with OTP: ${otp}`, 'authController.resetPassword', req.headers['user-agent'], req.body.email);

    const storedToken = await Token.findOne({ where: { token: otp } });
    if (!storedToken || storedToken.expiryDate < new Date()) {
      logger('error', 'Invalid or expired OTP', 'authController.resetPassword', req.headers['user-agent'], req.body.email);
      createResponse(res, {
        success: false,
        message: 'Invalid or expired OTP',
        statusCode: 400,
      });
      return;
    }

    const user = await User.findByPk(storedToken.userId);
    if (!user) {
      logger('error', 'User not found', 'authController.resetPassword', req.headers['user-agent'], req.body.email);
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await storedToken.destroy();

    logger('info', `Password reset successful for user with email: ${user.email}`, 'authController.resetPassword', req.headers['user-agent'], user.email, user.id.toString());
    createResponse(res, { success: true, message: 'Password reset successful' });
  } catch (err: any) {
    logger('error', err, 'authController.resetPassword', req.headers['user-agent'], req.body.email);
    createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};