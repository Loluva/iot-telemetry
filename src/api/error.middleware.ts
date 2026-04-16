import { NextFunction, Request, Response } from "express";

export const errorMiddleware=function(err:unknown,req:Request,res:Response,next:NextFunction):void{
   if(err instanceof Error){
    console.error(err)
    res.status(500).json({status:"error",error:{message:String(err.message),code:500}})
    return
   }

   console.error(`unexpected error: ${String(err)}`)
   res.status(500).json({status:"error",error:{message:String(err),code:500}})

   
}