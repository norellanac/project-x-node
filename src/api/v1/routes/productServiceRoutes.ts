import { Router } from 'express';
import {
  getAllProductServices,
  getProductServiceById,
  createProductService,
  updateProductService,
  deleteProductService,
} from  '../controllers/productServiceController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ProductServices
 *   description: ProductService management
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