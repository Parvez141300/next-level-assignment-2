import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();

// register user route
router.post("/signup", authControllers.registerUser);
// login user route
router.post("/signin", authControllers.loginUser);

export const authRoutes = router;