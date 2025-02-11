import { Router } from 'express';
import { getAllStates, getStateById, getAllCities, getCitiesByStateId } from '../controllers/locationController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: States
 *   description: API endpoints for managing states
 */

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: API endpoints for managing cities
 */

/**
 * @swagger
 * /public/states:
 *   get:
 *     summary: Get all states
 *     tags: [States]
 *     responses:
 *       200:
 *         description: Successfully retrieved all states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 *       500:
 *         description: Failed to fetch states
 */
router.get('/states', getAllStates);

/**
 * @swagger
 * /public/states/{id}:
 *   get:
 *     summary: Get a state by ID
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The state ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the state
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: State not found
 *       500:
 *         description: Failed to fetch state
 */
router.get('/states/:id', getStateById);

/**
 * @swagger
 * /public/cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: Successfully retrieved all cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       500:
 *         description: Failed to fetch cities
 */
router.get('/cities', getAllCities);

/**
 * @swagger
 * /public/states/{id}/cities:
 *   get:
 *     summary: Get all cities by state ID
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The state ID
 *     responses:
 *       200:
 *         description: Successfully retrieved all cities for the state
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *       500:
 *         description: Failed to fetch cities
 */
router.get('/states/:id/cities', getCitiesByStateId);

export default router;