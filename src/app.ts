import express, { Request, Response } from "express";
import initDB from "./config/db";
export const app = express();


// db initialize
initDB();

// parse
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send(' Vehicle Rental System is running 🚗')
})

