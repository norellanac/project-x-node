import { Router } from 'express';
import {
  getAllProductServices,
  getProductServiceById,
  createProductService,
  updateProductService,
  deleteProductService,
} from '../controllers/productServiceController';

const router = Router();

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
 */

/**
 * @swagger
 * /productservices:
 *   get:
 *     summary: Get all ProductServices
 *     tags: [ProductServices]
 *     responses:
 *       200:
 *         description: List of all ProductServices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductService'
 */
router.get('/', getAllProductServices);

/**
 * @swagger
 * /productservices/{id}:
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
 * /productservices:
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', createProductService);

/**
 * @swagger
 * /productservices/{id}:
 *   put:
 *     summary: Update a ProductService by ID
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
 *       400:
 *         description: Bad request
 *       404:
 *         description: ProductService not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateProductService);

/**
 * @swagger
 * /productservices/{id}:
 *   delete:
 *     summary: Delete a ProductService by ID
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

export default router;