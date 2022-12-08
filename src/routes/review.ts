import { Router } from "express";
import {
  getReview, getReviews, postReview, updateReview, deleteReview
} from "../controllers/review.controller";
import { validateSesion } from "../middleware/auth.middleware";
import { reviewOwner } from "../middleware/review.middleware";

const router = Router();

router.get("/", getReviews);

router.get("/:id", getReview);

router.post("/:movieId", validateSesion, postReview);

router.put("/:id", validateSesion, reviewOwner, updateReview);

router.delete("/:id", validateSesion, reviewOwner, deleteReview);

export { router };