import { pool } from "../../config/db"

const createBookingIntoDB = async (payload: Record<string, unknown>) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    // vehicle related query
    const vehicleResult = await pool.query(`
        SELECT * From Vehicles Where id=$1
        `, [vehicle_id]);

    if (vehicleResult.rowCount === 0) {
        return null
    }

    if (vehicleResult.rows[0].availability_status !== "available") {
        return null
    }

    // calculate days
    const startDate = new Date(rent_start_date as string);
    const endDate = new Date(rent_end_date as string);
    const number_of_days = Math.ceil(((endDate as any) - (startDate as any)) / (1000 * 60 * 60 * 24));
    // calculate price
    const total_price = vehicleResult.rows[0].daily_rent_price * number_of_days;



    // booking related query
    const result = await pool.query(`
        INSERT INTO Bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, 'active']);

    if(result.rowCount !== 0 && vehicleResult.rows[0].availability_status === "available"){
        await pool.query(`
            UPDATE Vehicles SET availability_status=$1 WHERE id=$2
            `, ['booked', vehicle_id]);
    }
    
    return { ...result.rows[0], vehicle: { vehicle_name: vehicleResult.rows[0].vehicle_name, daily_rent_price: vehicleResult.rows[0].daily_rent_price } };
}

export const bookingsServices = {
    createBookingIntoDB,
}