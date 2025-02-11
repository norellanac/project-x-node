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

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Category Name"
 *         description:
 *           type: string
 *           example: "Description of the category"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Product Service Name"
 *         description:
 *           type: string
 *           example: "Description of the product service"
 *         type:
 *           type: integer
 *           example: 1
 *         price:
 *           type: number
 *           format: float
 *           example: 100.0
 *         specialPrice:
 *           type: number
 *           format: float
 *           example: 80.0
 *         location:
 *           type: string
 *           example: "Location of the service"
 *         latitude:
 *           type: number
 *           format: float
 *           example: 40.7128
 *         longitude:
 *           type: number
 *           format: float
 *           example: -74.0060
 *         userId:
 *           type: integer
 *           example: 1
 *         averageRating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductDetail'
 *         locations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductLocation'
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductReview'
 *         user:
 *           $ref: '#/components/schemas/User'
 *     ProductDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Detail description"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductLocation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         address:
 *           type: string
 *           example: "Location address"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     ProductReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         comment:
 *           type: string
 *           example: "Review comment"
 *         rating:
 *           type: number
 *           format: float
 *           example: 4.5
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "User Name"
 *         lastname:
 *           type: string
 *           example: "User Lastname"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     State:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "California"
 *         urlImage:
 *           type: string
 *           example: "http://example.com/image.jpg"
 *         countryId:
 *           type: integer
 *           example: 1
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2023-01-01T00:00:00.000Z"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Los Angeles"
 *         stateId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00.000Z"
 */