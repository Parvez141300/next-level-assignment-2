import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

// get all vehicle route
router.get("/", vehiclesControllers.getAllVehicles);
// create vehicle route
router.post("/", auth("admin"), vehiclesControllers.createVehicle);

export const vehiclesRoutes = router;