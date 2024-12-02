import e, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { createResponse } from "../../../utils/responseUtils";
import { User } from "../models";


export const index = async (req: Request, res: Response) => {
  const users = await User.findAll( {include: { association: 'tokens' }, attributes: {exclude: ['password']}} );
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {attributes: {exclude: ['password']}});
    if (!user) {
      createResponse(res, { success: false, message: "User not found", statusCode: 404 });
      return;
    }
    createResponse(res, { success: true, data: user });
  } catch (err : any) {
    console.error("**Error**: ", err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
}

export const store = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
    const user = User.build({ name, lastname, email, password });
    await user.save();
    createResponse(res, { success: true, data: user, statusCode: 201 });
  } catch (err : any) {
    console.error("**Error**: ", err);
    err.errors 
    ? createResponse(res, { success: false, errors: err.errors, statusCode: 400 }) 
    : createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
};

const hashPassword = async (password: string | undefined, currentPassword: string): Promise<string> => {
  if (!password) return currentPassword;
  return await bcrypt.hash(password, 10);
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return createResponse(res, { success: false, message: "User not found", statusCode: 404 });
    }

    const hashedPassword = await hashPassword(password, user.password);

    const updatedUser = await user.update({
      name: name ?? user.name,
      lastname: lastname ?? user.lastname,
      email: email? email : user.email,
      password: hashedPassword,
    });

    return createResponse(res, { success: true, data: updatedUser.toJSON() });
  } catch (err: any) {
    console.error("**Error**: ", err);
    const statusCode = err.errors ? 400 : 500;
    return createResponse(res, { success: false, errors: err.errors ?? err, statusCode });
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      createResponse(res, { success: false, message: "User not found", statusCode: 404 });
      return;
    }
    await user.destroy();
    createResponse(res, { success: true, message: "User deleted successfully" });
  } catch (err : any) {
    console.error("**Error**: ", err);
    err.errors 
    ? createResponse(res, { success: false, errors: err.errors, statusCode: 400 }) 
    : createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
}




