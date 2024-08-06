import e, { Request, Response } from "express";
import { createResponse } from "../../../utils/responseUtils";
import { User } from "../models";


export const index = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
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

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      createResponse(res, { success: false, message: "User not found", statusCode: 404 });
      return;
    } 
    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    await user.save();
    createResponse(res, { success: true, data: user });
  } catch (err : any) {
    console.error("**Error**: ", err);
    err.errors 
    ? createResponse(res, { success: false, errors: err.errors, statusCode: 400 }) 
    : createResponse(res, { success: false, errors: err, statusCode: 500 });
  }
}

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




