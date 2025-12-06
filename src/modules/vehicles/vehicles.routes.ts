import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehiclesControllers.createVehicle);

export const vehiclesRoutes = router;