import {Router } from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.controller";

const router = Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name of the user
 *        email:
 *          type: string
 *          description: the email of the user
 *        password:
 *          type: string
 *          description: the password of the user
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: Example
 *        email: example@gmail.com
 *        password: example1234
 *    RegisterSuccesful:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: string
 *      example:
 *        message: successful sign in
 *        status: succes
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the email of the user
 *        password:
 *          type: string
 *          description: the password of the user
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: example@gmail.com
 *        password: pass1234

 */


/**
 * @openapi
 * /auth/register:
 *  post:
 *    summary: register in system
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      201:
 *        description: the user was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterSuccesful'
 *      500:
 *        description: Some server error
 *
 */
router.post("/register", registerCtrl);

/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: login in system
 *    tags: [Authentification]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: the user was successfully Login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                token:
 *                  type: string
 *      403:
 *        description: credentials of user are invalid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: credentials are invalid
 *      404:
 *        description: email of user not registered
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: email not registered
 *
 */
router.post("/login", loginCtrl);

export { router };