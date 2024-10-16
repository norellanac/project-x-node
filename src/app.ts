import express from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import { swaggerOptions } from './../swaggerConfig';
import { connectAppToDatabase } from "./config/db/db-connection";
import { authRouter, userRouter,  } from "./api/v1/routes";
import { httpLoggerMiddleware } from "./utils/requestLoggerMiddleware";
import { authenticateToken } from "./api/v1/middlewares/authenticateToken";

dotenv.config();
const app = express();
app.use(cors());
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(httpLoggerMiddleware);

connectAppToDatabase();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/users", authenticateToken, userRouter);
app.use("/api/v1/", authRouter);

export default app;
