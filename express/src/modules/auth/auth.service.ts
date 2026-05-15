import config from "../../config";
import { pool } from "../../db";
import type { IAuth } from "./auth.interface";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

const loginUserIntoDB = async (payLoad:IAuth) => {

    const {email,password} = payLoad

    const userData = await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
    if(userData.rows.length === 0) throw new Error("Invalid credentials!")

    const user = userData.rows[0]
    const matchedPassword = await bcrypt.compare(password,user.password)
    if(!matchedPassword) throw new Error("Invalid credentials!")

    const jwtpayload = {
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email
    }
    const accessToken = jwt.sign(jwtpayload,config.secret as string, {expiresIn: "1d"})
    
    return accessToken

};

export const authService = {
    loginUserIntoDB
}