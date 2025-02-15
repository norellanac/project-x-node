import { Router } from 'express';
import { addReaction, getReactions } from '../controllers/reactionController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reactions
 *   description: Reactions to various entities
 */

/**
 * @swagger
 * /reactions:
 *   post:
 *     summary: Add a reaction
 *     tags: [Reactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               reactableType:
 *                 type: string
 *               reactableId:
 *                 type: integer
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reaction added successfully
 *       500:
 *         description: Server error
 */
router.post('/reactions', addReaction);

/**
 * @swagger
 * /reactions/{reactableType}/{reactableId}:
 *   get:
 *     summary: Get reactions for an entity
 *     tags: [Reactions]
 *     parameters:
 *       - in: path
 *         name: reactableType
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the entity (e.g., message, post, comment)
 *       - in: path
 *         name: reactableId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the entity
 *     responses:
 *       200:
 *         description: List of reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reaction'
 *       500:
 *         description: Server error
 */
router.get('/reactions/:reactableType/:reactableId', getReactions);

export default router;