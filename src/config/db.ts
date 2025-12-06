import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: config.connection_string,
})

const initDB = async () => {
    try {
        // create users(customer) table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE CHECK (email = LOWER(email)),
            password VARCHAR(100) NOT NULL CHECK (LENGTH(password) >= 6),
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(20) CHECK (role IN ('admin', 'customer'))
            )
        `);

        // create vehicles table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(100) NOT NULL,
            type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(50) NOT NULL UNIQUE,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(20) CHECK (availability_status IN ('available', 'booked'))
            )
        `);

        // create bookings table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
            total_price INT NOT NULL CHECK (total_price > 0),
            status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'returned'))
            )
        `);
    } catch (error: any) {
        console.log(error.message);
    }
}

export default initDB;