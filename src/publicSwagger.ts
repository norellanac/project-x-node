/**
 * @swagger
 * tags:
 *   name: Public
 *   description: Publicly accessible routes
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
 */

/**
 * @swagger
 * /public/products:
 *   get:
 *     summary: Get all products
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductService'
 */