import { Router } from "express";
import { usersController } from "./users.controllers";

const router = Router();

// get all users route
router.get("/", usersController.getAllUsers);

export const usersRoute = router;