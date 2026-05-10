import { Router } from 'express';
import {
  getBranding,
  updateBranding,
  uploadBrandingAsset,
  removeSliderImage,
  removeIntroSlide,
} from '../controllers/brandingController';
import { authenticateToken } from '../middlewares/authenticateToken';
import { authorizeRole } from '../middlewares/authorizeRole';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Branding
 *   description: White-label branding configuration
 */

/**
 * @swagger
 * /branding:
 *   get:
 *     summary: Get the branding configuration (public)
 *     tags: [Branding]
 *     responses:
 *       200:
 *         description: Branding configuration object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Branding'
 */
router.get('/', getBranding);

/**
 * @swagger
 * /branding:
 *   put:
 *     summary: Update branding configuration (admin only)
 *     tags: [Branding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branding'
 *     responses:
 *       200:
 *         description: Updated branding configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Branding'
 */
router.put('/', authenticateToken, authorizeRole(['Admin']), updateBranding); 

/**
 * @swagger
 * /branding/assets/{type}:
 *   post:
 *     summary: Upload a branding image asset (admin only)
 *     tags: [Branding]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [logo, icon, splash, favicon, defaultImage, slider]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated branding with new asset URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Branding'
 */
router.post(
  '/assets/:type',
  authenticateToken,
  authorizeRole(['Admin']),
  uploadBrandingAsset,
);

/**
 * @swagger
 * /branding/slider/{index}:
 *   delete:
 *     summary: Remove a slider image by index (admin only)
 *     tags: [Branding]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Updated branding configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Branding'
 */
router.delete(
  '/slider/:index',
  authenticateToken,
  authorizeRole(['Admin']),
  removeSliderImage,
);

router.delete(
  '/intro-slides/:index',
  authenticateToken,
  authorizeRole(['Admin']),
  removeIntroSlide,
);

export default router;
