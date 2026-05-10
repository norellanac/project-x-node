import { Router } from 'express';
import multer from 'multer';
import {
  getAllProductServices,
  getProductServiceById,
  createProductService,
  updateProductService,
  deleteProductService,
  uploadProductServiceImage,
} from '../controllers/productServiceController';
import { paginationMiddleware } from '../middlewares/paginationMiddleware';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

/**
 * @swagger
 * tags:
 *   name: ProductServices
 *   description: ProductService management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductService:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - type
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the ProductService
 *         name:
 *           type: string
 *           description: The name of the ProductService
 *         description:
 *           type: string
 *           description: The description of the ProductService
 *         type:
 *           type: integer
 *           description: The type of the ProductService
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the ProductService
 *         specialPrice:
 *           type: number
 *           format: float
 *           description: The special price of the ProductService
 *         location:
 *           type: string
 *           description: The location of the ProductService
 *         latitude:
 *           type: number
 *           format: float
 *           description: The latitude of the ProductService location
 *         longitude:
 *           type: number
 *           format: float
 *           description: The longitude of the ProductService location
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the ProductService
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the ProductService
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductDetail'
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductLocation'
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductReview'
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all ProductServices
 *     tags: [ProductServices]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: limit of records per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Skip n instances/rows
 *     responses:
 *       200:
 *         description: List of all ProductServices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductService'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
router.get('/', paginationMiddleware, getAllProductServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a ProductService by ID
 *     tags: [ProductServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ProductService ID
 *     responses:
 *       200:
 *         description: The ProductService data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductService'
 *       404:
 *         description: ProductService not found
 */
router.get('/:id', getProductServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new ProductService
 *     tags: [ProductServices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductService'
 *     responses:
 *       201:
 *         description: The created ProductService
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductService'
 *       500:
 *         description: Server error
 */
router.post('/', createProductService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update an existing ProductService
 *     tags: [ProductServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ProductService ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductService'
 *     responses:
 *       200:
 *         description: The updated ProductService
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductService'
 *       404:
 *         description: ProductService not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateProductService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a ProductService
 *     tags: [ProductServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ProductService ID
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: ProductService not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteProductService);

/**
 * @swagger
 * /services/{id}/image:
 *   put:
 *     summary: Upload an image for a ProductService
 *     tags: [ProductServices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ProductService ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductService'
 *       404:
 *         description: ProductService not found
 *       500:
 *         description: Server error
 */
router.put('/:id/image', uploadProductServiceImage);

export default router;