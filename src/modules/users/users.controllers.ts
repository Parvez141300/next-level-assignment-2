import { Request, Response } from "express";
import { usersServices } from "./users.services";

// get all users req and res handle
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.createUserIntoDB();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: "Missing or invalid authentication token",
            errors: error.message
        })
    }
}

export const usersController = {
    getAllUsers,
}