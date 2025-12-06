import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";

const router = Router();

// create booking route
router.post("/", bookingsControllers.createBooking)

export const bookingsRoutes = router;