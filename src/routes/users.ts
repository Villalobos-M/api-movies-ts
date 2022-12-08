import { Router } from "express";
import {
  getUser, getUsers, updateUser, deleteUser
} from "../controllers/users.controller";
  import { validateSesion } from "../middleware/auth.middleware"
import { protectAccountOwner } from "../middleware/user.middleware";

// import { logMiddleware } from "../middleware/log";

const router = Router();

router.get("/",   getUsers);

router.get("/:id",  getUser);

router.put("/:id", validateSesion, protectAccountOwner, updateUser);

router.delete("/:id", validateSesion, protectAccountOwner, deleteUser);

export { router };