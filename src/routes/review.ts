import { Router } from "express";
import {
  getReview, getReviews, postReview, updateReview, deleteReview
} from "../controllers/review.controller";
import { validateSesion } from "../middleware/auth.middleware";
import { reviewOwner } from "../middleware/review.middleware";

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
 *    Review:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the title of review
 *        text:
 *          type: string
 *          description: the text of the review
 *        rating:
 *          type: number
 *          description: the rating of the movie 0-5
 *        status:
 *          type: string
 *          description: auto-generated 
 *        userId:
 *          type: array
 *          description: the userId autosaves
 *        movieId:
 *          type: array
 *          description: the movieId autosaves
 *      required:
 *        - title
 *        - text
 *      example:
 *        id: gQBOyGbxcQy6tEp0aZ78X
 *        title: Buena pelicula
 *        text: Me gusto mucho, excelentes actores
 *        rating: 5
 *        status: active
 *        userId: gQB1yGaxcLy6tMp0aZ79X
 *        movieId: mQBOyFbxcQy6tEi0aq71X
 *    PutPostReview:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: the a title of review
 *        text:
 *          type: string
 *          description: the text/description of the review
 *        rating:
 *          type: number
 *          description: the rating of the movie
 *      required:
 *        - title
 *        - text
 *    ReviewNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not found review
 *        status:
 *          type: string
 *          description: A status for the not found review
 *      example:
 *        message: review was not found
 *        status: error
 *    ReviewNotOwner:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: A message for the not owner review
 *        status:
 *          type: string
 *          description: A status for the not owner review
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
 *    reviewId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: the review id
 *    movieId:
 *      in: path
 *      name: movieId
 *      required: true
 *      schema:
 *        type: string
 *      description: the movie id
 */


/**
 * @openapi
 * /review:
 *  get:
 *    summary: returns a list of reviews
 *    tags: [Reviews]
 *    responses:
 *      200:
 *        description: the list of reviews
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Review'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/", validateSesion, getReviews);

/**
 * @openapi
 * /review/{id}:
 *  get:
 *    summary: get a review by id
 *    tags: [Reviews]
 *    parameters:
 *      - $ref: '#/components/parameters/reviewId'
 *    responses:
 *      200:
 *        description: the found review
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Review'
 *      404:
 *        description: the review was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReviewNotFound'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.get("/:id", validateSesion, getReview);

/**
 * @openapi
 * /review/{movieId}:
 *  post:
 *    summary: create review in movie
 *    tags: [Reviews]
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutPostReview'
 *    responses:
 *      201:
 *        description: the review was successfully create
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Review'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.post("/:movieId", validateSesion, postReview);

/**
 * @openapi
 * /review/{id}:
 *  put:
 *    summary: update a movie by id
 *    tags: [Reviews]
 *    description: A review can be edited as long as he is the owner of it
 *    parameters:
 *      - $ref: '#/components/parameters/reviewId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PutPostReview'
 *    responses:
 *      200:
 *        description: The updated review 
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Review'
 *      403:
 *        description: Does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReviewNotOwner'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.put("/:id", validateSesion, reviewOwner, updateReview);

/**
 * @openapi
 * /review/{id}:
 *  delete:
 *    summary: delete a review by id
 *    tags: [Reviews]
 *    description: A review can be delited as long as he is the owner of it
 *    parameters:
 *      - $ref: '#/components/parameters/reviewId'
 *    responses:
 *      200:
 *        description: the review was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Review'
 *      403:
 *        description: Does not have permissions
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ReviewNotOwner'
 *      401:
 *        description: The user do not have an authorized jwt
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Auth'
 *    security:
 *      - bearerAuth: []
 */
router.delete("/:id", validateSesion, reviewOwner, deleteReview);

export { router };