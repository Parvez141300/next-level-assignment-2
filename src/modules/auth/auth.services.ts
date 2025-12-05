import { pool } from "../../config/db"
import bcrypt from "bcryptjs";

// create user into the db
const registerUserIntoDB = async (payload: Record<string, unknown>) => {
    console.log(payload);
    const { name, email, password, phone, role } = payload;
    if((password as string).length < 6){
        throw new Error("Password must be minimum 6 character long");
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);
    const result = await pool.query(`
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hashedPassword, phone, role]);

    delete result.rows[0].password;
    return result;
}

export const authServices = {
    registerUserIntoDB,
}