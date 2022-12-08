import { Router } from "express";
import {
  getActor, getActors, postActor, updateActor, deleteActor} from "../controllers/actors.controller";
import { protectAdmin, validateSesion } from "../middleware/auth.middleware"
import multerMiddleware from "../middleware/file.middleware";


const router = Router();

router.get("/", getActors);

router.get("/:id", getActor);

router.post("/", validateSesion, protectAdmin, multerMiddleware.single("actorImage"), postActor);

router.put("/:id", validateSesion, protectAdmin, updateActor);

router.delete("/:id", validateSesion, protectAdmin, deleteActor);

export { router };