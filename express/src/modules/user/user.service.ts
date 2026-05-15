import { pool } from "../../db";
import type { IUser } from "./user.interface";

const getUsersFromDB = async () => {
  const result = await pool.query(/*sql*/ `
        SELECT * FROM users
            `);
  return result;
};

const getUserFromDB = async (id: string) => {
  const result = await pool.query(
    /*sql*/ `
    SELECT * FROM users WHERE id=$1
        `,
    [id],
  );
  return result;
};

const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;
  const result = await pool.query(
    /*sql*/ `
        INSERT INTO users(name,email,password,age)
        VALUES($1,$2,$3,$4)
        RETURNING *
            `,
    [name, email, password, age],
  );
  return result;
};

const updateUserIntoDB = async (payLoad: IUser, id: string) => {
  const { name, password, age, is_active } = payLoad;

  const result = await pool.query(
    /*sql*/ `
    UPDATE users SET name = COALESCE($1, name),
    password = COALESCE($2, password),
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
    WHERE id=$5
    RETURNING *
        `,
    [name, password, age, is_active, id],
  );
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    /*sql*/ `
        DELETE FROM users WHERE id=$1
        RETURNING *
            `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getUsersFromDB,
  getUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
