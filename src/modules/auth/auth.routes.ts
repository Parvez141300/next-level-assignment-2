import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

// register user route
router.post("/signup", authControllers.registerUser)

export const authRoutes = router;