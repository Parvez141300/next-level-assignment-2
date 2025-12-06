import { Router } from "express";
import { usersController } from "./users.controllers";
import auth from "../../middleware/auth";

const router = Router();

// get all users route
router.get("/", auth("admin"), usersController.getAllUsers);
// update a user route
router.put("/:userId", auth("admin", "customer"), usersController.updateUser);
// delete a user route
router.delete("/:userId", auth("admin"), usersController.deleteUser);

export const usersRoute = router;