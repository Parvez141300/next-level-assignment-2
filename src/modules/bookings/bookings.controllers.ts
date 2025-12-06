import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

// create booking req and res handle
const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.createBookingIntoDB(req.body) as any;
        console.log(result);
        if (result.total_price) {
            res.status(200).json({
                success: true,
                message: "Booking created successfully",
                data: result,
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "Booking failed",
                errors: "Resource doesn't exist"
            })
        }
    } catch (error: any) {
        res.status(403).json({
            success: false,
            message: "Valid token but insufficient permissions",
            errors: error.message
        })
    }
}

export const bookingsControllers = {
    createBooking,
}