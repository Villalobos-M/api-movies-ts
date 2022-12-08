import { Router } from "express";
import {
  getMovie, getMovies, postMovie, updateMovie, deleteMovie, assignActor,deleteActor
} from "../controllers/movies.controller";
import { protectAdmin, validateSesion } from "../middleware/auth.middleware";
import multerMiddleware from "../middleware/file.middleware";


const router = Router();

router.get("/", validateSesion, getMovies);
router.get("/:id", getMovie);
router.post("/", validateSesion, protectAdmin, multerMiddleware.single("myfile"), postMovie);
router.put("/:id", validateSesion, protectAdmin, updateMovie);
router.delete("/:id", validateSesion, protectAdmin, deleteMovie);

router.put("/assignActor/:id", validateSesion, protectAdmin, assignActor);
router.delete("/deleteActor/:id", validateSesion, protectAdmin, deleteActor);


export { router };