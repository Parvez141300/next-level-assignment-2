import { Request, Response } from "express";
import { authServices } from "./auth.services";

// register user
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

// login user
const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authServices.getLoginUserInfoFromDB(req.body);
        if (result) {
            return res.status(201).json({
                success: true,
                message: "Login successful",
                data: result
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Validation errors, invalid input",
                data: result
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

export const authControllers = {
    registerUser,
    loginUser,
}