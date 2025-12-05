import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const jwtToken = req.headers.authorization?.split(" ")[1] as string;

        if (!jwtToken) {
            return res.status(401).json({
                success: false,
                message: "Your are not authorized",
                errors: "Missing or invalid authentication token"
            })
        }

        const decoded = jwt.verify(jwtToken, config.jwt_secret as string) as JwtPayload;
        const user = await pool.query('SELECT * FROM users WHERE email=$1', [decoded.email]);

        if (user.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                errors: "Resource doesn't exist"
            })
        }

        req.user = decoded;

        if (roles.length && !roles.includes(decoded.role)) {
            return res.status(401).json({
                success: false,
                message: "Your are not authorized",
                errors: "Missing or invalid authentication token"
            })
        }
        
        next();
    }
}

export default auth