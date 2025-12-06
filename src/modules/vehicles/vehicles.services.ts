import { pool } from "../../config/db";

// create the vehicle into the db
const createVehicleIntoDB = async (payload: Record<string, unknown>) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;

    const result = await pool.query(`
        INSERT INTO Vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);

    return result;
}

// get all vehicles from db
const getAllVehiclesFromDB = async () => {
    const result = await pool.query(`SELECT * FROM Vehicles`);
    return result;
}

// get single vehicles from db
const getSingleVehicleFromDB = async (vehicleId: number) => {
    const result = await pool.query(`SELECT * FROM Vehicles WHERE id=$1`, [vehicleId]);

    return result;
}

// update vehicle into db
const updateVehicleIntoDB = async (payload: Record<string, unknown>, vehicleId: number) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await pool.query(`
        UPDATE Vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]);

    return result;
}

// delete vehicle into db
const deleteVehicleFromDB = async (vehicleId: number) => {

    const result = await pool.query(`DELETE FROM Vehicles WHERE id=$1 RETURNING *`, [vehicleId]);

    return result;
}

export const vehiclesServices = {
    createVehicleIntoDB,
    getAllVehiclesFromDB,
    getSingleVehicleFromDB,
    updateVehicleIntoDB,
    deleteVehicleFromDB,
}