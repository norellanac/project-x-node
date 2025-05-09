import { Router } from 'express';
import {
  createUserReview,
  getUserReviews,
  updateUserReview,
  deleteUserReview,
} from '../controllers/userReviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Reviews
 *   description: User review management
 */

/**
 * @swagger
 * /user-reviews:
 *   post:
 *     summary: Create a new user review
 *     tags: [User Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: User review created successfully
 *       500:
 *         description: Server error
 */
router.post('/', createUserReview);

/**
 * @swagger
 * /user-reviews/{merchantId}:
 *   get:
 *     summary: Get all reviews for a user
 *     tags: [User Reviews]
 *     parameters:
 *       - in: path
 *         name: merchantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The merchant (user) ID
 *     responses:
 *       200:
 *         description: List of user reviews
 *       500:
 *         description: Server error
 */
router.get('/:merchantId', getUserReviews);

/**
 * @swagger
 * /user-reviews/{id}:
 *   put:
 *     summary: Update a user review
 *     tags: [User Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user review ID
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
 *         description: User review updated successfully
 *       404:
 *         description: User review not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateUserReview);

/**
 * @swagger
 * /user-reviews/{id}:
 *   delete:
 *     summary: Delete a user review
 *     tags: [User Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user review ID
 *     responses:
 *       200:
 *         description: User review deleted successfully
 *       404:
 *         description: User review not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteUserReview);

export default router;