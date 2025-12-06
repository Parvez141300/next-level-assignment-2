import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";

const router = Router();

// create booking route
router.post("/", auth("admin", "customer"), bookingsControllers.createBooking);
// get all booking route
router.get("/", auth("admin"), bookingsControllers.getAllBooking);

export const bookingsRoutes = router;