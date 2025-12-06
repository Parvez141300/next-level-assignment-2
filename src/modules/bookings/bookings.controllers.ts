import { Request, Response } from "express";
import { bookingsServices } from "./bookings.services";

// create booking req and res handle
const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.createBookingIntoDB(req.body) as any;
        
        if (result?.total_price) {
            res.status(200).json({
                success: true,
                message: "Booking created successfully",
                data: result,
            })
        }
        else if(result === null){
            res.status(400).json({
                success: false,
                message: "This vehicle already booked",
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

// get all booking req and res handle
const getAllBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingsServices.getAllBookingsFromDB();
        console.log(result);
        if (result.length > 0) {
            res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: result,
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "Booking retrieved failed",
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
    getAllBooking,
}