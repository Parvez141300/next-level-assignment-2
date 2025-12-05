import { pool } from "../../config/db"

// create user into the db
const createUserIntoDB = async () => {
    const result = await pool.query('SELECT * FROM users');

    return result;
}

export const usersServices = {
    createUserIntoDB,
}