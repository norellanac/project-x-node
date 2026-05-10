import { Router } from 'express';
import {
  createProductReview,
  getProductReviews,
  updateProductReview,
  deleteProductReview,
} from '../controllers/productReviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Product Reviews
 *   description: Product review management
 */

/**
 * @swagger
 * /product-reviews:
 *   post:
 *     summary: Create a new product review
 *     tags: [Product Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productServiceId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product review created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createProductReview);

/**
 * @swagger
 * /product-reviews/{productServiceId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags: [Product Reviews]
 *     parameters:
 *       - in: path
 *         name: productServiceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product service ID
 *     responses:
 *       200:
 *         description: List of product reviews
 *       500:
 *         description: Server error
 */
router.get('/:productServiceId', getProductReviews);

/**
 * @swagger
 * /product-reviews/{id}:
 *   put:
 *     summary: Update a product review
 *     tags: [Product Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product review updated successfully
 *       404:
 *         description: Product review not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateProductReview);

/**
 * @swagger
 * /product-reviews/{id}:
 *   delete:
 *     summary: Delete a product review
 *     tags: [Product Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product review ID
 *     responses:
 *       200:
 *         description: Product review deleted successfully
 *       404:
 *         description: Product review not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteProductReview);

export default router;