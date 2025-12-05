import { Router } from "express";
import { usersController } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router();

// get all users route
router.get("/", auth("admin"), usersController.getAllUsers);

export const usersRoute = router;