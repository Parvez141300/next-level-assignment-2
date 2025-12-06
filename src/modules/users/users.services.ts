import { pool } from "../../config/db"

// create user into the db
const getAllUsersFromDB = async () => {
    const result = await pool.query('SELECT id, name, email, phone, role FROM users');

    return result;
}

// update user into db
const updateUserIntoDB = async (payload: Record<string, unknown>, userId: number) => {
    const { name, email, phone, role } = payload;
    const userInfo = await pool.query(`SELECT * FROM users WHERE id=$1`, [userId]);
    let result;
    if (userInfo.rows[0].role === "admin") {
        return result = await pool.query(`
            UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role`, [name, email, phone, role, userId]);
    }
    else if (userInfo.rows[0].role === "customer") {
        return result = await pool.query(`
            UPDATE users SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING id, name, email, phone, role`, [name, email, phone, userId]);
    }
    else {
        return null
    }
}

export const usersServices = {
    getAllUsersFromDB,
    updateUserIntoDB
}