import express from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './../swaggerConfig';
import { connectAppToDatabase } from "./config/db/db-connection";
import { authRouter, userRouter,  } from "./api/v1/routes";
import { httpLoggerMiddleware } from "./utils/requestLoggerMiddleware";

dotenv.config();
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(httpLoggerMiddleware);

connectAppToDatabase();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/", authRouter);

export default app;
