import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

// create user into the db
const registerUserIntoDB = async (payload: Record<string, unknown>) => {
    console.log(payload);
    const { name, email, password, phone, role } = payload;
    if ((password as string).length < 6) {
        throw new Error("Password must be minimum 6 character long");
    }
    const hashedPassword = await bcrypt.hash(password as string, 10);
    const result = await pool.query(`
        INSERT INTO Users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hashedPassword, phone, role]);

    delete result.rows[0].password;
    return result;
}

// login user
const getLoginUserInfoFromDB = async (payload: Record<string, unknown>) => {
    const { email, password } = payload;
    const result = await pool.query('SELECT * FROM Users WHERE email=$1', [email]);

    const user = result.rows[0];
    const isMatchedPassword = await bcrypt.compare(password as string, user.password);
    // check if matched correctly
    if (!isMatchedPassword) {
        return null;
    }

    // jwt token generate
    const jwtSecret = config.jwt_secret;
    const jwtToken = jwt.sign({ name: user.name, email: user.email, phone: user.phone, role: user.role }, jwtSecret as string, { expiresIn: "7d" });

    delete user.password;
    return { token: jwtToken, user };
}

export const authServices = {
    registerUserIntoDB,
    getLoginUserInfoFromDB,
}