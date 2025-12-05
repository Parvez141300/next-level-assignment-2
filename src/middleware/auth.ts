import { NextFunction, Request, Response } from "express";

const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        next();
    }
}

export default auth