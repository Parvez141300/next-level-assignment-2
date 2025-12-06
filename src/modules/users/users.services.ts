import { pool } from "../../config/db"

// create user into the db
const getAllUsersFromDB = async () => {
    const result = await pool.query('SELECT id, name, email, phone, role FROM users');

    return result;
}

export const usersServices = {
    getAllUsersFromDB,
}