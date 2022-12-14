import { Router } from "express";
import {
  getMovie, getMovies, postMovie, updateMovie, deleteMovie, assignActor,deleteActor
} from "../controllers/movies.controller";
import { protectAdmin, validateSesion } from "../middleware/auth.middleware";
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
 *    Movie:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the auto-generated id of task
 *        description:
 *          type: string
 *          description: the name of the user
 *        duration:
 *          type: string
 *          description: the email of the user
 *        top:
 *          type: number
 *          description: the password of the user
 *        genre:
 *          type: string
 *          description: the auto-generated role of user
 *        image:
 *          type: string
 *          description: the auto-generated role of user
 *        reviews:
 *          type: array
 *          description: the id of the review will be added only when the user submits it in "review/:movieId"
 *        actorsId:
 *          type: array
 *          description: the id of the review will be added only when the user submits it in "review/:movieId"
 *      required:
 *        - title
 *        - description
 *        - duration
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        title: Toy Story
 *        description: animated movie for kids
 *        duration: 1.45hr
 *        top: 5
 *        genre: animated
 *        image: ../image.jpg
 *        reviews: []
 *        actorsId: []
 *    PostMovie:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the auto-generated id of task
 *        description:
 *          type: string
 *          description: the name of the user
 *        duration:
 *          type: string
 *          description: the email of the user
 *        top:
 *          type: number
 *          description: the password of the user
 *        genre:
 *          type: string
 *          description: the auto-generated role of user
 *        image:
 *          type: string
 *          description: the auto-generated role of user
 *      required:
 *        - title
 *        - description
 *        - duration
 *    PutMovie:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the auto-generated id of task
 *        description:
 *          type: string
 *          description: the name of the user
 *        duration:
 *          type: string
 *          description: the email of the user
 *        top:
 *          type: number
 *          description: the password of the user
 *        genre:
 *          type: string
 *          description: the auto-generated role of user
 *        image:
 *          type: string
 *          description: the auto-generated role of user
 *    ActorIn:
 *      type: object
 *      properties:
 *        actorId:
 *          type: string
 *          description: id actor
 * 
 *    MovieNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found movie
 *        status:
 *          type: string
 *          description: A status for the not found movie
 *      example:
 *        message: Movie was not found
 *        status: error
 *    ProtectAdmin:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        status:
 *          type: string
 *      example:
 *        message: Acceso denegado, no tienes permiso para manipular peliculas
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
 *    movieId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the movie id
 */



/**
 * @swagger
 * /movies:
 *  get:
 *    summary: returns a list of movies
 *    tags: [Movies]
 *    responses:
 *      200:
 *        description: The list of movies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/", validateSesion, getMovies);

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    summary: get a movie by id
 *    tags: [Movies]
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    responses:
 *      200:
 *        description: the found movie
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movie'
 *      404:
 *        description: the movie was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieNotFound'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/:id", validateSesion, getMovie);

/**
 * @swagger
 * /movies:
 *  post:
 *    summary: create movie in system
 *    tags: [Movies]
 *    description: this endpoint can be accessed by a person with the role "admin", the image can be uploaded from the front or in "form-data"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostMovie'
 *    responses:
 *      200:
 *        description: the movie was successfully create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
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
router.post("/", validateSesion, protectAdmin, multerMiddleware.single("myfile"), postMovie);

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: update a movie by id
 *    tags: [Movies]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutMovie'
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movie'
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
router.put("/:id", validateSesion, protectAdmin, updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    summary: delete a movie by id
 *    tags: [Movies]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    responses:
 *      200:
 *        description: the movie was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movie'
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
router.delete("/:id", validateSesion, protectAdmin, deleteMovie);


// ENDPOINTS ACTORS IN MOVIE
/**
 * @swagger
 * /movies/assignActor/{id}:
 *  put:
 *    summary: add actor to movie
 *    tags: [Movies]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ActorIn'
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movie'
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
router.put("/assignActor/:id", validateSesion, protectAdmin, assignActor);

/**
 * @swagger
 * /movies/deleteActor/{id}:
 *  delete:
 *    summary: delete actor of movie by id
 *    tags: [Movies]
 *    description: This endpoint can be accessed by a login of a person with "admin" role
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ActorIn'
 *    responses:
 *      200:
 *        description: the movie was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Movie'
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
router.delete("/deleteActor/:id", validateSesion, protectAdmin, deleteActor);


export { router };