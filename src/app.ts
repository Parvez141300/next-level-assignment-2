import express, { Request, Response } from "express";
import initDB from "./config/db";
import { usersRoute } from "./modules/users/users.routes";
export const app = express();


// db initialize
initDB();

// parse
app.use(express.json());

// get all the user route
app.use("/api/v1/users", usersRoute);

app.get('/', (req: Request, res: Response) => {
  res.send(' Vehicle Rental System is running 🚗')
})

