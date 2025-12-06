import { pool } from "../../config/db"

// create booking into db
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

    if (result.rowCount !== 0 && vehicleResult.rows[0].availability_status === "available") {
        await pool.query(`
            UPDATE Vehicles SET availability_status=$1 WHERE id=$2
            `, ['booked', vehicle_id]);
    }

    return { ...result.rows[0], vehicle: { vehicle_name: vehicleResult.rows[0].vehicle_name, daily_rent_price: vehicleResult.rows[0].daily_rent_price } };
}

// get all booking from db
const getAllBookingsFromDB = async () => {

    // auto-return logic
    // await pool.query(`
    //         UPDATE Bookings
    //         SET status = 'returned'
    //         WHERE rent_end_date < CURRENT_DATE AND status = 'active'
    //         `);
    // await pool.query(`
    //         UPDATE Vehicles
    //         SET availability_status = 'available'
    //         WHERE IN (
    //         SELECT vehicles_id
    //         FROM Bookings
    //         WHERE rent_end_date < CURRENT_DATE AND status = 'active'
    //         )
    //         `);

    const result = await pool.query(`
        SELECT 
        Bookings.id,
        Bookings.customer_id,
        Bookings.vehicle_id,
        Bookings.rent_start_date,
        Bookings.rent_end_date,
        Bookings.total_price,
        Bookings.status,

        Users.name AS customer_name,
        Users.email AS customer_email,

        Vehicles.vehicle_name,
        Vehicles.registration_number

        FROM Bookings
        INNER JOIN Users ON Bookings.customer_id = Users.id
        INNER JOIN Vehicles ON Bookings.vehicle_id = Vehicles.id
        `);

    const formatted = result.rows.map(row => ({
        id: row.id,
        customer_id: row.customer_id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date,
        rent_end_date: row.rent_end_date,
        total_price: row.total_price,
        status: row.status,
        customer: {
            name: row.customer_name,
            email: row.customer_email
        },
        vehicle: {
            vehicle_name: row.vehicle_name,
            registration_number: row.registration_number
        }
    }))



    return formatted;
}

// get user booking from db
const getUserBookingFromDB = async (userId: number) => {
    const result = await pool.query(`
        SELECT
        Bookings.id,
        Bookings.vehicle_id,
        Bookings.rent_start_date,
        Bookings.rent_end_date,
        Bookings.total_price,
        Bookings.status,

        Vehicles.vehicle_name,
        Vehicles.registration_number,
        Vehicles.type
        FROM
        Bookings
        INNER JOIN Vehicles ON Bookings.vehicle_id = Vehicles.id
        WHERE Bookings.customer_id = $1
        `, [userId]);

    const formatted = result.rows.map(row => ({
        id: row.id,
        vehicle_id: row.vehicle_id,
        rent_start_date: row.rent_start_date,
        rent_end_date: row.rent_end_date,
        total_price: row.total_price,
        status: row.status,
        vehicle: {
            vehicle_name: row.vehicle_name,
            registration_number: row.registration_number,
            type: row.type
        }
    }))

    return formatted;
}

// update booking into db
const updateBookingIntoDB = async (bookingId: number, payload: Record<string, unknown>) => {

    const getRole = await pool.query(`
        SELECT
        Users.role,
        Bookings.vehicle_id
        FROM Bookings
        INNER JOIN Users ON Bookings.customer_id = Users.id
        WHERE Bookings.id = $1
        `, [bookingId]);

    console.log(getRole.rows[0]);
    let bookingResult;
    if (getRole.rows[0].role === "customer") {
        bookingResult = await pool.query(`
            UPDATE Bookings 
            SET status = $1
            WHERE id = $2 RETURNING *
            `, [payload.status, bookingId]);
        return { result: bookingResult.rows[0], role: getRole.rows[0].role };
    }
    else if (getRole.rows[0].role === "admin") {

        bookingResult = await pool.query(`
            UPDATE Bookings 
            SET status = $1
            WHERE id = $2 RETURNING *
            `, [payload.status, bookingId]);
        const vehicle_id = getRole.rows[0].vehicle_id;
        const vehicleResult = await pool.query(`
            UPDATE Vehicles
            SET availability_status = $1
            WHERE id = $2 RETURNING availability_status
            `, ['available', vehicle_id])

        const finalResult = {
            ...bookingResult.rows[0],
            vehicle: {
                availability_status: vehicleResult.rows[0].availability_status
            }
        }
        return { result: finalResult, role: getRole.rows[0].role };
    }
}

export const bookingsServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingFromDB,
    updateBookingIntoDB,
}