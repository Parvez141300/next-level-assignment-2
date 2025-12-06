import express, { Request, Response } from "express";
import initDB from "./config/db";
import { usersRoute } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
export const app = express();


// db initialize
initDB();

// parse
app.use(express.json());

// auth route
app.use("/api/v1/auth", authRoutes)
// users route
app.use("/api/v1/users", usersRoute);
// vehicles route
app.use("/api/v1/vehicles", vehiclesRoutes);
// bookings route
app.use("/api/v1/bookings", bookingsRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send(' Vehicle Rental System is running 🚗')
})

