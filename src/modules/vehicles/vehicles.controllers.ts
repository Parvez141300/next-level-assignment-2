import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.services";

// create vehicle req and res handler
const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.createVehicleIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: "failed to create vehicle",
            errors: error.message
        })
    }
}

export const vehiclesControllers = {
    createVehicle,
}