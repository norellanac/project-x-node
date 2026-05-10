import { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { Role, User } from '../models';
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

    logger(
      'info',
      `Registering user with email: ${email}`,
      'authController.register',
      req.headers['user-agent'],
      email
    );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = User.build({ name, lastname, email, password: hashedPassword });
    await user.save();

    // Assign a default role to the user
    const defaultRole = await Role.findOne({ where: { name: 'User' } }); // Replace 'User' with your default role name
    if (defaultRole) {
      await user.addRole(defaultRole); // Use Sequelize's association method to assign the role
    }

    logger(
      'info',
      `User registered successfully with email: ${email}`,
      'authController.register',
      req.headers['user-agent'],
      email,
      user.id.toString()
    );
    
    user.password = '';
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = crypto.randomBytes(40).toString('hex');

    await (Token as any).create({
      userId: user.id,
      token: accessToken,
      type: 'ACCESS',
      expiryDate: new Date(Date.now() + 15 * 60 * 1000),
    });

    await (Token as any).create({
      userId: user.id,
      token: refreshToken,
      type: 'REFRESH',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    createResponse(res, { success: true, data: { user, accessToken, refreshToken }, statusCode: 201 });
  } catch (err: any) {
    logger(
      'error',
      err,
      'authController.register',
      req.headers['user-agent'],
      req.body.email
    );

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
    const user = await User.scope('withPassword').findOne(
      { where: { email }, 
      include: [{ model: Role, as: 'roles' }]
    });

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

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = crypto.randomBytes(40).toString('hex');

    // Store Access Token (Optional, for blacklisting if needed, but here used for session tracking)
    const accestokenTimeExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await (Token as any).create({
      userId: user.id,
      token: accessToken,
      type: 'ACCESS',
      expiryDate: accestokenTimeExpiration,
    });

    // Store Refresh Token
    const refreshTokenExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await (Token as any).create({
      userId: user.id,
      token: refreshToken,
      type: 'REFRESH',
      expiryDate: refreshTokenExpiration,
    });

    user.password = '';
    logger('info', `User logged in successfully with email: ${email}`, 'authController.login', req.headers['user-agent'], email, user.id.toString());
    createResponse(res, { success: true, data: { user, accessToken, refreshToken } });
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
      type: 'PASSWORD_RESET',
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

    const storedToken = await Token.findOne({ where: { token: otp, type: 'PASSWORD_RESET' } });
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

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return createResponse(res, { success: false, message: 'Refresh token is required', statusCode: 400 });
  }

  try {
    const storedToken = await Token.findOne({ where: { token: refreshToken, type: 'REFRESH' }, include: { association: 'user' } });

    if (!storedToken || storedToken.expiryDate < new Date()) {
      return createResponse(res, { success: false, message: 'Invalid or expired refresh token', statusCode: 403 });
    }

    const user = storedToken.user;
    if (!user) {
      return createResponse(res, { success: false, message: 'User not found', statusCode: 404 });
    }

    const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    
    // Store New Access Token
    await Token.create({
      userId: user.id,
      token: newAccessToken,
      type: 'ACCESS',
      expiryDate: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    // Optionally rotate refresh token
    const newRefreshToken = crypto.randomBytes(40).toString('hex');
    await Token.create({
      userId: user.id,
      token: newRefreshToken,
      type: 'REFRESH',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Delete the old refresh token
    await storedToken.destroy();

    createResponse(res, { success: true, data: { accessToken: newAccessToken, refreshToken: newRefreshToken } });
  } catch (err: any) {
    logger('error', err, 'authController.refreshToken', req.headers['user-agent']);
    createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const accessToken = req.headers['authorization'];

  try {
    if (refreshToken) {
      await Token.destroy({ where: { token: refreshToken, type: 'REFRESH' } });
    }
    if (accessToken) {
      let tokenValue = accessToken;
      if (tokenValue.startsWith('Bearer ')) {
        tokenValue = tokenValue.slice(7, tokenValue.length);
      }
      await Token.destroy({ where: { token: tokenValue, type: 'ACCESS' } });
    }
    createResponse(res, { success: true, message: 'Logged out successfully' });
  } catch (err: any) {
    logger('error', err, 'authController.logout', req.headers['user-agent']);
    createResponse(res, { success: false, message: err.message, statusCode: 500 });
  }
};