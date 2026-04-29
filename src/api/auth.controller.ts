import { NextFunction,Response,Request } from "express";
import { IUserRepository } from "../domain/user.repository";
import { AuthService } from "./auth/auth.service";

export class AuthController{
    private authService
    constructor(repo:IUserRepository){
        this.authService=new AuthService(repo)
    }  
    async login(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
                const {email,password}=req.body
                const result=await this.authService.login({email,password})
                if(!result) {
                    res.status(401).json({status:"error",error:{message:`incorrect credentials`,code:"401"}})
                    return
                }
                res.status(200).json({status:"success",data:result, meta:{}})

        } catch (error) {
            next(error)
        }
    }
}