import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createResponse } from '../../../utils/responseUtils';
import { ProductService, User } from '../models';
import fileStorage from '../middlewares/fileStorage';

export const index = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: [{ model: ProductService, as: 'products' }],
    attributes: { exclude: ['password'] },
  });
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }
    createResponse(res, { success: true, data: user });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
};

export const store = async (req: Request, res: Response) => {
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

const hashPassword = async (
  password: string | undefined,
  currentPassword: string
): Promise<string> => {
  if (!password) return currentPassword;
  return await bcrypt.hash(password, 10);
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    const hashedPassword = await hashPassword(password, user.password);

    const updatedUser = await user.update({
      name: name ?? user.name,
      lastname: lastname ?? user.lastname,
      email: email ? email : user.email,
      password: hashedPassword,
    });

    return createResponse(res, { success: true, data: updatedUser.toJSON() });
  } catch (err: any) {
    console.error('**Error**: ', err);
    const statusCode = err.errors ? 400 : 500;
    return createResponse(res, {
      success: false,
      errors: err.errors ?? err,
      statusCode,
    });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }
    await user.destroy();
    createResponse(res, {
      success: true,
      message: 'User deleted successfully',
    });
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

// New method to update avatarUrl
export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    // Delete the old avatar if it exists
    if (user.avatarUrl) {
      try {
        fileStorage.deleteFile(`.${user.avatarUrl}`);
      } catch (error) {
        console.error('Failed to delete old avatar:', error);
      }
    }

    // Define a custom name for the uploaded file
    const customName = `avatar-${id}`;
    const avatarUrl = await fileStorage.saveFile('avatars', customName, req, res);

    if (!avatarUrl) {
      return createResponse(res, {
        success: false,
        message: 'Failed to upload avatar',
        statusCode: 400,
      });
    }

    // Update user record with new avatar URL
    user.avatarUrl = avatarUrl;
    await user.save();

    return createResponse(res, { success: true, data: user });
  } catch (err: any) {
    console.error('**Error in updateAvatar**:', err);
    return createResponse(res, {
      success: false,
      message: 'An error occurred while updating the avatar',
      errors: err,
      statusCode: 500,
    });
  }
};