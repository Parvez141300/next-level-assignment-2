import { Router } from "express";
import { bookingsControllers } from "./bookings.controllers";
import auth from "../../middleware/auth";

const router = Router();

// create booking route
router.post("/", auth("admin", "customer"), bookingsControllers.createBooking);
// get all booking route
router.get("/", auth("admin"), bookingsControllers.getAllBooking);
// get customer booking route
router.get("/:userId", auth("customer"), bookingsControllers.getUserBooking);
// update booking route
router.put("/:bookingId", auth("admin", "customer"), bookingsControllers.updateBooking);

export const bookingsRoutes = router;