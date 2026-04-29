
import { PublicUser } from "../../domain/user.types";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { env } from "../../config/env";
import { IUserRepository } from "../../domain/user.repository";
type LoginResult={
    token:string,
    user:PublicUser
}|null

type LoginPayload={
    email:string,
    password:string
}

const validateLoginPayload=function(data:unknown):data is LoginPayload{
    return (data instanceof Object
        && "email" in data &&typeof data.email ==="string"
        &&"password" in data&&typeof data.password==="string")
}   

export class AuthService{
    constructor(private repo:IUserRepository){} 
    async login(data:unknown):Promise<LoginResult>{
        if(!validateLoginPayload(data)){
            return null
        }
        try {
        const result=await this.repo.findUserByEmail(data.email)
        if(!result) return null

        const isValid=await bcrypt.compare(data.password,result.password_hash)
        if(!isValid) return null

        const {password_hash,...publicUser}=result
       
        const token =jwt.sign({userId:result.id,role:result.role},env.JWT_SECRET,{expiresIn:(env.JWT_EXPIRES_IN as SignOptions['expiresIn'])||"24h"})
        return {token,user:publicUser}
        } catch (error) {
            console.error("[AuthService]: ",error)
            throw error
        }
    }
}