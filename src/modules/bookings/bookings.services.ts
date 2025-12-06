import { pool } from "../../config/db"

const createBookingIntoDB = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const result = await pool.query(`
        INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date)`, [customer_id, vehicle_id, rent_start_date, rent_end_date]);

    return result;
}

export const bookingsServices = {
    createBookingIntoDB,
}