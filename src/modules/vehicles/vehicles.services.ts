import { pool } from "../../config/db";

// create the vehicle into the db
const createVehicleIntoDB = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
}

// get all vehicles from db
const getAllVehiclesFromDB = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

// get single vehicles from db
const getSingleVehicleFromDB = async (vehicleId: number) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicleId]);

    return result;
}

export const vehiclesServices = {
    createVehicleIntoDB,
    getAllVehiclesFromDB,
    getSingleVehicleFromDB,
}