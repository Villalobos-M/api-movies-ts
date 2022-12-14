import { Router } from "express";
import {
  getUser, getUsers, updateUser, deleteUser
} from "../controllers/users.controller";
  import { validateSesion } from "../middleware/auth.middleware"
import { protectAccountOwner } from "../middleware/user.middleware";

// import { logMiddleware } from "../middleware/log";

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes: 
 *    bearerAuth: 
 *      type: http
 *      scheme: bearer  
 *      bearerFormat: JWT  
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of task
 *        name:
 *          type: string
 *          description: the name of the user
 *        email:
 *          type: string
 *          description: the email of the user
 *        password:
 *          type: string
 *          description: the password of the user
 *        role:
 *          type: string
 *          description: the auto-generated role of user
 *        reviews:
 *          type: array
 *          description: the id of the review will be added only when the user submits it in "review/:movieId"
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        name: Armando Stone
 *        email: armando@gmail.com
 *        reviews: []
 *        createdAt: xxxxx
 *        updatedAt: xxxxx
 *    PutUser:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name of the user
 *        email:
 *          type: string
 *          description: the email of the user
 *    UserNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found user
 *        status:
 *          type: string
 *          description: A status for the not found user
 *      example:
 *        message: NOT FOUND
 *        status: error
 *    UserNotOwner:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not owner user
 *        status:
 *          type: string
 *          description: A status for the not owner user
 *      example:
 *        message: Acceso denegado, No tienes permiso para editar este perfil
 *        status: error
 *    Auth:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: string
 *      example:
 *        message: Unauthorized, you do not have an authorized jwt
 *        status: error
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the user id
 */


/**
 * @swagger
 * /users:
 *  get:
 *    summary: returns a list of users
 *    tags: [Users]
 *    description: Anyone can access this endpoint
 *    responses:
 *      200:
 *        description: The list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */
router.get("/",   getUsers);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: get a user by id
 *    tags: [Users]
 *    description: Anyone can access this endpoint
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: the found user
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      404:
 *        description: the user was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
router.get("/:id",  getUser);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: update a user by id
 *    tags: [Users]
 *    description: A user can be edited as long as he is the owner of it
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutUser'
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      403:
 *        description: The user does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotOwner'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.put("/:id", validateSesion, protectAccountOwner, updateUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: delete a user by id
 *    tags: [Users]
 *    description: A user can be delited as long as he is the owner of it
 *    parameters:
 *      - $ref: '#/components/parameters/userId'
 *    responses:
 *      200:
 *        description: the user was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/User'
 *      403:
 *        description: The user does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotOwner'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.delete("/:id", validateSesion, protectAccountOwner, deleteUser);

export { router };

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1hckBnbWFpbC5jb20iLCJpYXQiOjE2NzA5NTA0MDEsImV4cCI6MTY3MDk1NzYwMX0.LvqVpJZicQAgHyREdL3F8cz81CJdaU-KY5uBTemzSx8