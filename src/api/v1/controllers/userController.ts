import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createResponse } from '../../../utils/responseUtils';
import { ProductService, Role, User } from '../models';
import fileStorage from '../middlewares/fileStorage';

export const index = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      include: [
        { model: ProductService, as: 'products' },
        { model: Role, as: 'roles' }, // Include roles
      ],
      attributes: { exclude: ['password'] },
    });
    createResponse(res, { success: true, data: users });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      include: [
        { model: ProductService, as: 'products' },
        { model: Role, as: 'roles' },
      ],
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
    const { name, lastname, email, password, roles } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, lastname, email, password: hashedPassword });

    // Assign roles if provided
    if (roles && roles.length > 0) {
      const roleInstances = await Role.findAll({ where: { id: roles } });
      await user.setRoles(roleInstances);
    }

    const userWithRoles = await User.findByPk(user.id, {
      include: [{ model: Role, as: 'roles' }],
    });

    createResponse(res, { success: true, data: userWithRoles, statusCode: 201 });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, {
      success: false,
      errors: err.errors ?? err,
      statusCode: 400,
    });
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
    const { name, lastname, email, password, roles } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return createResponse(res, {
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
    }

    const hashedPassword = await hashPassword(password, user.password);

    // Update user fields
    await user.update({
      name: name ?? user.name,
      lastname: lastname ?? user.lastname,
      email: email ?? user.email,
      password: hashedPassword,
    });

    // Update roles if provided
    if (roles && roles.length > 0) {
      const roleInstances = await Role.findAll({ where: { id: roles } });
      await user.setRoles(roleInstances);
    }

    const updatedUser = await User.findByPk(id, {
      include: [{ model: Role, as: 'roles' }],
    });

    return createResponse(res, { success: true, data: updatedUser });
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
    createResponse(res, {
      success: false,
      errors: err.errors ?? err,
      statusCode: 500,
    });
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