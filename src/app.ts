import express from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import multer from 'multer';
import path from "path";
import { swaggerOptions } from './../swaggerConfig';
import { connectAppToDatabase } from "./config/db/db-connection";
import { authRouter, categoryRouter, userRouter, ProducServiceRouter  } from "./api/v1/routes";
import { authenticateToken } from "./api/v1/middlewares/authenticateToken";
import { getCategories } from "./api/v1/controllers/categoryController";
import { httpLoggerMiddleware } from "./api/v1/middlewares/requestLoggerMiddleware";
import { getAllProductServices, getProductServiceById } from "./api/v1/controllers/productServiceController";


dotenv.config();
const app = express();
const apiPathAndVersion = "/api/v1";
const upload = multer({ dest: 'uploads/' })
app.use(cors());
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(`${apiPathAndVersion}/uploads`, express.static(path .join(__dirname, '../uploads')));

connectAppToDatabase();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((`${apiPathAndVersion}/`), httpLoggerMiddleware, authRouter);

app.use((`${apiPathAndVersion}/users`), authenticateToken, userRouter);

app.use((`${apiPathAndVersion}/categories`), authenticateToken, categoryRouter);
app.get((`${apiPathAndVersion}/categoriesPublic`), getCategories);

app.use((`${apiPathAndVersion}/products`), authenticateToken,  ProducServiceRouter);

// Public routes
app.get((`${apiPathAndVersion}/public/categories`), getCategories);
app.get((`${apiPathAndVersion}/public/products`), getAllProductServices);
app.get((`${apiPathAndVersion}/public/products/:id`), getProductServiceById);

export default app;
