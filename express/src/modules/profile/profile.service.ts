import { pool } from "../../db"
import type { IProfile } from "./profile.interface"

const createProileIntoDB = async(payLoad:IProfile) => {
    const {user_id,bio,address,phone,gender} = payLoad

    const user = await pool.query(`SELECT * FROM users WHERE id=$1`,[user_id])
    if(user.rows.length === 0) throw new Error("User not found")

    const result = await pool.query(/*sql*/`
    INSERT INTO profiles(user_id,bio,address,phone,gender)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,[user_id,bio,address,phone,gender])
    return result

}

export const profileService = {
    createProileIntoDB
}