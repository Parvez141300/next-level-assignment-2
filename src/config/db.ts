import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
    connectionString: config.connection_string,
})

const initDB = async () => {
    try {
        // create users(customer) table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE CHECK (email = LOWER(email)),
            password VARCHAR(50) NOT NULL CHECK (LENGTH(password) >= 6),
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'customer'))
            )
            `);

        // create vehicles table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(50) NOT NULL,
            type VARCHAR(20) CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number INT NOT NULL UNIQUE,
            daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(50) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )
            `);

        // create bookings table schema
        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings(
            id SERIAL PRIMARY KEY,
            customer_id INT REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
            rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
            total_price INT NOT NULL CHECK (total_price > 0),
            status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
            )
            `);
    } catch (error: any) {
        console.log(error.message);
    }
}

export default initDB;