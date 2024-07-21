import { Router } from 'express';
import {
  store,
  index,
  show,
  update,
  destroy,
} from '../controllers/userController';

const router = Router();
/**
 * @swagger
* /api/v1/users:
*   get:
*     summary: Get all users
*     tags: [Users]
*     responses:
*       200:
*         description: The list of users.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
* 
* /api/v1/users/store:
*   post:
*     summary: Create a new user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user was successfully created.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       400:
*         description: Bad request.
* 
* /api/v1/users/show/{id}:
*   get:
*     summary: Get the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The user id
*         schema:
*           type: integer
*     responses:
*       200:
*         description: The user description by id.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found.
* 
* /api/v1/users/update/{id}:
*   put:
*     summary: Update the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The user id
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user was updated.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: The user was not found.
* 
* /api/v1/users/delete/{id}:
*   delete:
*     summary: Delete the user by id
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The user id
*         schema:
*           type: integer
*     responses:
*       200:
*         description: The user was deleted.
*       404:
*         description: The user was not found.
* 
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - email
*       properties:
*         id:
*           type: integer
*           description: The user ID.
*         name:
*           type: string
*           description: The user name.
*         email:
*           type: string
*           description: The user email.
*         created_at:
*             type: string
*             format: date-time
*             description: The user creation date.
*         updated_at:
*             type: string
*             format: date-time
*             description: The user update date.
* @endswagger */

router.get('/', index);
router.post('/store', store);
router.get('/show/:id', show);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);


export default router;
