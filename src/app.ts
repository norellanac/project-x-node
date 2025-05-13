import express from "express";
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import multer from 'multer';
import path from "path";
import { swaggerOptions } from './../swaggerConfig';
import { connectAppToDatabase } from "./config/db/db-connection";
import { authRouter, categoryRouter, userRouter, ProducServiceRouter, locationRouter, orderRouter, chatRouter, reactionRouter, productReviewRoutes, userReviewRoutes } from "./api/v1/routes";
import { authenticateToken } from "./api/v1/middlewares/authenticateToken";
import { getAllCategories } from "./api/v1/controllers/categoryController";
import { httpLoggerMiddleware } from "./api/v1/middlewares/requestLoggerMiddleware";
import { getAllProductServices, getProductServiceById } from "./api/v1/controllers/productServiceController";
import { paginationMiddleware } from "./api/v1/middlewares/paginationMiddleware";


dotenv.config();
const app = express();
const apiPathAndVersion = "/api/v1";
const upload = multer({ dest: 'uploads/' });

app.use(cors());
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(`${apiPathAndVersion}/uploads`, express.static(path.join(__dirname, '../uploads')));

connectAppToDatabase();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((`${apiPathAndVersion}/`), httpLoggerMiddleware, authRouter);

app.use((`${apiPathAndVersion}/users`), authenticateToken, userRouter);

app.use((`${apiPathAndVersion}/categories`), authenticateToken, categoryRouter);
app.get((`${apiPathAndVersion}/categoriesPublic`), getAllCategories);

app.use((`${apiPathAndVersion}/products`), authenticateToken, ProducServiceRouter);
app.use((`${apiPathAndVersion}/orders`), authenticateToken, orderRouter);

// Public routes
app.get((`${apiPathAndVersion}/public/categories`), getAllCategories);
app.get((`${apiPathAndVersion}/public/products`), paginationMiddleware, getAllProductServices);
app.get((`${apiPathAndVersion}/public/products/:id`), getProductServiceById);
app.use((`${apiPathAndVersion}/public`), locationRouter);

// Chat routes
app.use((`${apiPathAndVersion}/chat`), authenticateToken, chatRouter);

// Reaction routes
app.use((`${apiPathAndVersion}/reactions`), authenticateToken, reactionRouter);


//Review Routes
app.use((`${apiPathAndVersion}/productReview`), authenticateToken, productReviewRoutes);
app.use((`${apiPathAndVersion}/userReview`), authenticateToken, userReviewRoutes);


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;
