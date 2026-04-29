import { pool } from "../config/database";
import { IUserRepository } from "../domain/user.repository";
import { PublicUser, User } from "../domain/user.types";

export class SqlUserRepository implements IUserRepository {
    async findUserByEmail(email: string): Promise<User | null> {
        const result=await pool.query("SELECT * FROM users WHERE email=$1",[email])
        if(!result.rows[0]) return null
        return result.rows[0]
    }
    async findUserById(id: number): Promise<PublicUser | null> {
        const result=await pool.query("SELECT id, email, role, created_at, updated_at FROM users WHERE id=$1",[id])
        if(!result.rows[0]) return null
        return result.rows[0]
    }
}