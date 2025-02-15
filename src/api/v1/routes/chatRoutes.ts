import { Router } from 'express';
import { createConversation, sendMessage, getMessages } from '../controllers/chatController';
import { addReaction, getReactions } from '../controllers/reactionController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat between users
 */

/**
 * @swagger
 * /conversation:
 *   post:
 *     summary: Create a conversation
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user1Id:
 *                 type: integer
 *               user2Id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       500:
 *         description: Server error
 */
router.post('/conversation', createConversation);

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: integer
 *               senderId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       500:
 *         description: Server error
 */
router.post('/message', sendMessage);

/**
 * @swagger
 * /messages/{conversationId}:
 *   get:
 *     summary: Get messages in a conversation
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The conversation ID
 *     responses:
 *       200:
 *         description: List of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server error
 */
router.get('/messages/:conversationId', getMessages);

/**
 * @swagger
 * /reaction:
 *   post:
 *     summary: Add a reaction to a message
 *     tags: [Chat]
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
 *                 example: "message"
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
router.post('/reaction', addReaction);

/**
 * @swagger
 * /reactions/{reactableType}/{reactableId}:
 *   get:
 *     summary: Get reactions for a message
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: reactableType
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the entity (e.g., message)
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