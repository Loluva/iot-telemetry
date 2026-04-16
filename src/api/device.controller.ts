import { NextFunction, Request, Response } from "express";
import { DeviceRepository } from "../domain/device.repository";

export class DeviceController{
    constructor(private repo:DeviceRepository){}

    async findById(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
        const id=Number(req.params.id)
        if(isNaN(id)){
            res.status(400).json({status:"error",error:{message:`invalid id`,code:"400"}})
            return
        }
        const result=await this.repo.findById(id)
        if(result===null) {
            res.status(404).json({status:"error",error:{message:`not found devices with id ${id}`,code:"404"}})
            return
        }
        res.status(200).json({status:"success",data:result,meta:{}})
        }catch (error){
            next(error)
        }
        
    }

    
    async findBySerial(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
        const serial=req.params.serial
        if(!serial && serial!=="string"){
            res.status(400).json({status:"error",error:{message:` serial`,code:"400"}})
            return
        }
        const result=await this.repo.findBySerial(serial as string)
        if(result===null) {
            res.status(404).json({status:"error",error:{message:`not found devices with serial ${serial}`,code:"404"}})
            return
        }
        res.status(200).json({status:"success",data:result,meta:{}})
        }catch (error){
            next(error)
        }
    }

    async findByUser(req:Request,res:Response,next:NextFunction):Promise<void>{
          try{
        const user=Number(req.params.user)
        if(isNaN(user)){
            res.status(400).json({status:"error",error:{message:`invalid user`,code:"400"}})
            return
        }
        const result=await this.repo.findByUser(user)
        res.status(200).json({status:"success",data:result,meta:{}})
        }catch (error){
            next(error)
        }
    }

    async create(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
        const body=req.body
        if(!body.serial || typeof(body.serial)!=="string") {
            res.status(400).json({status:"error",erro:{message:"serial is invalid or missing",code:400}})
            return
        }
        const result=await this.repo.create(body)
        res.status(201).json({status:"success",data:result,meta:{}})
        } catch (error) {
            next(error)
        }
     
    }

    async update(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const id=Number(req.params.id)
            const body=req.body
            if(isNaN(id)){
                res.status(400).json({status:"error",error:{message:`invalid id`,code:"400"}})
                return
            }
            if(body===undefined || body===null){
                res.status(400).json({status:"error",error:{message:`No parameters to update`,code:"400"}})
                return
            }
            if(Object.keys(body).length===0 ){
                res.status(400).json({status:"error",error:{message:`No parameters to update`,code:"400"}})
                return
            }
            const result=await this.repo.update(id,body)
            res.status(200).json({status:"success",data:result,meta:{}})
        } catch (error) {
            next(error)
        }
    }


}