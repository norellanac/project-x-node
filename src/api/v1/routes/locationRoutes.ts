import { Router } from 'express';
import { getAllStates, getStateById, getAllCities, getCitiesByStateId } from '../controllers/locationController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: API endpoints for managing locations
 */

/**
 * @swagger
 * /states:
 *   get:
 *     summary: Get all states
 *     tags: [Locations]
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
 * /states/{id}:
 *   get:
 *     summary: Get a state by ID
 *     tags: [Locations]
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
 * /cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Locations]
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
 * /states/{id}/cities:
 *   get:
 *     summary: Get all cities by state ID
 *     tags: [Locations]
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
 *       404:
 *         description: No cities found for the state
 *       500:
 *         description: Failed to fetch cities
 */
router.get('/states/:id/cities', getCitiesByStateId);

export default router;