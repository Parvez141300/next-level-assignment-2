import { Request, Response } from "express";
import { usersServices } from "./users.services";

// get all users req and res handle
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await usersServices.getAllUsersFromDB();
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

// update a user req and res handle
const updateUser = async (req: Request, res: Response) => {
    const uId = parseInt(req.params.userId as string);
    try {
        const result = await usersServices.updateUserIntoDB(req.body, uId) as any;

        if (result) {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "failed to update user info",
                errors: "Resource doesn't exist"
            })
        }

    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: "Missing or invalid authentication token",
            errors: error.message
        })
    }
}

// delete a user req and res handle
const deleteUser = async (req: Request, res: Response) => {
    const uId = parseInt(req.params.userId as string);
    try {
        const result = await usersServices.deleteUserFromDB(uId) as any;
        if (result === null){
            res.status(400).json({
                success: false,
                message: "User booking is active so it cannot be deleted",
            })
        }
        if (result?.rows?.length > 0) {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
            })
        }
        
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "Resource doesn't exist",
            errors: error.message
        })
    }
}

export const usersController = {
    getAllUsers,
    updateUser,
    deleteUser,
}