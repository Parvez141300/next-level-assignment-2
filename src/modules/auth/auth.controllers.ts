import { Request, Response } from "express";
import { authServices } from "./auth.services";

const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await authServices.registerUserIntoDB(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: "failed to register",
            errors: error.message
        })
    }
}

export const authControllers = {
    registerUser,
}