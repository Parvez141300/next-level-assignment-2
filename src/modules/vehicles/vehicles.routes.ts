import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

// get all vehicle route
router.get("/", vehiclesControllers.getAllVehicles);
// get single vehicle route
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);
// create vehicle route
router.post("/", auth("admin"), vehiclesControllers.createVehicle);
// update a vehicle route
router.put("/:vehicleId", auth("admin"), vehiclesControllers.updateVehicle);

export const vehiclesRoutes = router;