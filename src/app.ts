import express from "express";
import sequelize from "./config/db/db-connection";
import { authRouter, userRouter,  } from "./api/v1/routes";
require('dotenv').config();
const app = express();
app.use(express.json());



const initApp = async () => {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}
initApp();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/", authRouter);

export default app;
