import { Router } from "express";
import {
  getActor, getActors, postActor, updateActor, deleteActor} from "../controllers/actors.controller";
import { protectAdmin, validateSesion } from "../middleware/auth.middleware"
import multerMiddleware from "../middleware/file.middleware";


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
 *    Actor:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name of the actor
 *        country:
 *          type: string
 *          description: the country of the actor
 *        age:
 *          type: number
 *          description: the age of the actor
 *        status:
 *          type: string
 *          description: the auto-generated status of user
 *        oscarsPrizes:
 *          type: number
 *          description: the number of the actor awards
 *        image:
 *          type: string
 *          description: the image of the actor
 *        genre:
 *          type: array
 *          description: the genre of the actor
 *        movies:
 *          type: array
 *          description: the id of the movie will be added only when the user submit it in "movies/assignActor/:id"
 *      required:
 *        - name
 *        - country
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        name: Kalimba
 *        country: Moneterrey, MX
 *        age: 37
 *        status: active
 *        oscarsPrizes: 1
 *        image: ../image.jpg
 *        genre: masculine
 *        movies: []
 *    PutPostActor:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the name of the actor
 *        country:
 *          type: string
 *          description: the country of the actor
 *        age:
 *          type: number
 *          description: the age of the actor
 *        oscarsPrizes:
 *          type: number
 *          description: the awards of the actor
 *        genre:
 *          type: string
 *          description: the genre of the actor
 *        image:
 *          type: string
 *          description: the imagele of actor
 *      required:
 *        - name
 *        - country
 *    ActorInMovie:
 *      type: object
 *      properties:
 *        actor:
 *          type: string
 *          description: id actor
 *    ActorNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found actor
 *        status:
 *          type: string
 *          description: A status for the not found actor
 *      example:
 *        message: actor not found
 *        status: error
 *    ProtectAdmin:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: string
 *      example:
 *        message: Acceso denegado, no tienes permiso para manipular actores
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
 *    actorId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the actor id
 */

/**
 * @swagger
 * /actors:
 *  get:
 *    summary: returns a list of actor
 *    tags: [Actors]
 *    responses:
 *      200:
 *        description: The list of actor
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Actor'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/", validateSesion, getActors);

/**
 * @swagger
 * /actors/{id}:
 *  get:
 *    summary: get a actor by id
 *    tags: [Actors]
 *    parameters:
 *      - $ref: '#/components/parameters/actorId'
 *    responses:
 *      200:
 *        description: the found actor
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Actor'
 *      404:
 *        description: the actor was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ActorNotFound'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/:id", validateSesion, getActor);

/**
 * @swagger
 * /actors:
 *  post:
 *    summary: create movie in system
 *    tags: [Actors]
 *    description: this endpoint can be accessed by a person with the role "admin", the image can be uploaded from the front or in "form-data"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutPostActor'
 *    responses:
 *      200:
 *        description: the movie was successfully create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Actor'
 *      403:
 *        description: The user does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProtectAdmin'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.post("/", validateSesion, protectAdmin, multerMiddleware.single("actorImage"), postActor);

/**
 * @swagger
 * /actors/{id}:
 *  put:
 *    summary: Update a actor by id
 *    tags: [Actors]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/actorId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutPostActor'
 *    responses:
 *      200:
 *        description: The updated actor 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Actor'
 *      403:
 *        description: The user does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProtectAdmin'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.put("/:id", validateSesion, protectAdmin, updateActor);

/**
 * @swagger
 * /actors/{id}:
 *  delete:
 *    summary: delete a actor by id
 *    tags: [Actors]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/actorId'
 *    responses:
 *      200:
 *        description: the actor was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Actor'
 *      403:
 *        description: The user does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProtectAdmin'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.delete("/:id", validateSesion, protectAdmin, deleteActor);

export { router };