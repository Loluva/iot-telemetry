import { NextFunction, Request, Response } from "express"
import jwt, { SignOptions } from "jsonwebtoken"
import { env } from "../../config/env"
declare global{
    namespace Express{
        interface Request{
            user?:{
                userId:number,
                role:"admin"|"user"
            }
        }
    }
}
interface UserPayload{
        userId:number,
        role:"admin"|"user"
    }
const validateDecodePayload=function(data:unknown):data is UserPayload{
return (data instanceof Object
    &&"userId" in data &&"role" in data
    && typeof data.userId==="number" 
    && (data.role==="user"||data.role==="admin"))
}
export const authMiddleware=async function(req:Request,res:Response, next:NextFunction):Promise<void>{
    try {
        const header=req.headers.authorization
        if(typeof header!=="string"){
            res.status(401).json({status:"error", error:{message:"header authorization invalid format",code:"401"}})
            return
        }
        const [Bearer,token]=header.split(" ")
        if(Bearer!=="Bearer"||token===undefined||typeof token!=="string") {
            res.status(401).json({status:"error", error:{message:"header authorization invalid format",code:"401"}})
            return
        }
        const decode=jwt.verify(token,env.JWT_SECRET)
        console.log(decode)
        if(!validateDecodePayload(decode)){
            res.status(401).json({status:"error", error:{message:"invalid decode payload",code:"401"}})
            return
        }
        req.user=decode
        next()
    } catch (error) {
        console.error(`[AuthMiddelware] verify token error: `, error)
         res.status(401).json({status:"error", error:{message:`invalid or expired token`,code:"401"}})
        return
    }
}