import { Request, Response } from "express";
import { User } from "../../models/v1";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, age } = req.body;
  const user = User.build({ firstName: 'NewUser', lastName: 'NewLastname', email: "test@gmail.com" });
  await user.save();
  console.log(user);
  return res.status(201).json(user);
  // user.firstName = firstName;
  // user.lastName = lastName;
  // user.age = age;
  // await AppDataSource.manager.save(user);
  // res.status(201).json(user);
};
