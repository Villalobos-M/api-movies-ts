import { Router } from "express";
import {
  getMovie, getMovies, postMovie, updateMovie, deleteMovie, assignActor,deleteActor
} from "../controllers/movies.controller";
import { protectAdmin, validateSesion } from "../middleware/auth.middleware";
import multerMiddleware from "../middleware/file.middleware";


const router = Router();

/**
 * @openapi
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
 *          format: binary
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
 *    PostPutMovie:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the title of task
 *        description:
 *          type: string
 *          description: the description of the movie
 *        duration:
 *          type: string
 *          description: how long a movie lasts
 *        top:
 *          type: number
 *          description: the top of the movie 0-10
 *        genre:
 *          type: string
 *          description: the genre of the movie
 *        image:
 *          type: string
 *          description: the image of the movie
 *      required:
 *        - title
 *        - description
 *        - duration
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
 *        message: You do not have permissions to execute this action
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
 * @openapi
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
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Movie'
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
 * @openapi
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
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                data:
 *                  $ref: '#/components/schemas/Movie'
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
 * @openapi
 * /movies:
 *  post:
 *    summary: create movie in system
 *    tags: [Movies]
 *    description: this endpoint can be accessed by a person with the role "admin"
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: the title of the movie
 *              description:
 *                type: string
 *                description: the description of the movie
 *              duration:
 *                type: string
 *                description: the duration of the movie
 *              top:
 *               type: number
 *               description: the top of the movie
 *              genre:
 *                type: string
 *                description: the genre of movie
 *              imageMovie:
 *                type: string
 *                format: binary
 *                description: the image of the movie
 *            required:
 *              - title
 *              - description
 *              - duration
 *    responses:
 *      201:
 *        description: the movie was successfully create
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                data:
 *                  $ref: '#/components/schemas/Movie'
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
router.post("/", validateSesion, protectAdmin, multerMiddleware.single("imageMovie"), postMovie);

/**
 * @openapi
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
 *            $ref: '#/components/schemas/PostPutMovie'
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                message:
 *                  type: string
 *                  example: an movie was updated
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
 * @openapi
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
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                message:
 *                  type: string
 *                  example: an movie was deleted
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
 * @openapi
 * /movies/assignActor/{movieId}:
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
 *            type: object
 *            properties:
 *              actorId:
 *                type: string
 *                example: gQBOyGbxcQy6tEp0aZ78X
 *    responses:
 *      200:
 *        description: The updated user 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                message:
 *                  type: string
 *                  example: an actor was added
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
router.put("/assignActor/:movieId", validateSesion, protectAdmin, assignActor);

/**
 * @openapi
 * /movies/deleteActor/{movieId}:
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
 *            type: object
 *            properties:
 *              actorId:
 *                type: string
 *                example: gQBOyGbxcQy6tEp0aZ78X
 *    responses:
 *      200:
 *        description: the movie was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: succes
 *                message:
 *                  type: string
 *                  example: an actor was deleted
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
router.delete("/deleteActor/movieId", validateSesion, protectAdmin, deleteActor);


export { router };