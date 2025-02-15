/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Publicly accessible endpoints
 */

/**
 * @swagger
 * /public/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /public/products:
 *   get:
 *     summary: Get all products
 *     tags: [Public]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: List of all products
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
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /public/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductService'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /public/states:
 *   get:
 *     summary: Get all states
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of all states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /public/states/{id}:
 *   get:
 *     summary: Get a state by ID
 *     tags: [Public]
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
 *         description: Server error
 */

/**
 * @swagger
 * /public/cities:
 *   get:
 *     summary: Get all cities
 *     tags: [Public]
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
 *         description: Server error
 */

/**
 * @swagger
 * /public/states/{id}/cities:
 *   get:
 *     summary: Get all cities by state ID
 *     tags: [Public]
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
 *         description: Server error
 */