import express, { Request, Response } from "express";
export const app = express();

// parse
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send(' Vehicle Rental System is running 🚗')
})

