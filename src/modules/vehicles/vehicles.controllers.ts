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

// get all vehicle req and res handler
const getAllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehiclesServices.getAllVehiclesFromDB();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Resource doesn't exist",
            errors: error.message
        })
    }
}

// get single vehicle req and res handler
const getSingleVehicle = async (req: Request, res: Response) => {
    const {vehicleId} = req.params;
    const vId = parseInt(vehicleId as string);
    try {
        const result = await vehiclesServices.getSingleVehicleFromDB(vId);
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Resource doesn't exist",
            errors: error.message
        })
    }
}

export const vehiclesControllers = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
}