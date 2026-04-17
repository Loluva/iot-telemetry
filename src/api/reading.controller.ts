import { NextFunction,Request, Response } from "express";
import { ReadingRepository } from "../domain/reading.repository";

export class ReadingController{
    constructor(private repo:ReadingRepository){}

    async findByDevice(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const id=Number(req.params.id)
            if(isNaN(id)){
                res.status(400).json({status:"error","error":{message:`invalid id ${id}`, code:400}})
                return
            }
            const result= await this.repo.findByDevice(id)
            res.status(200).json({"status":"success","data":result,"meta":{}})
        } catch (error) {
            next(error)
        }
    }
    async findByDeviceAndVar(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const id=Number(req.params.id)
            const variable=req.params.variable
            if(isNaN(id)){
                res.status(400).json({status:"error","error":{message:`invalid id ${id}`, code:400}})
                return
            }
            if(!variable|| Array.isArray(variable)){
                res.status(400).json({status:"error","error":{message:`variable is invalid or missing`, code:400}})
                return
            }
            const result=await this.repo.findByDeviceAndVar({"device_id":id,"variable":variable})
            res.status(200).json({"status":"success","data":result,"meta":{}})

        } catch (error) {
            next(error)
        }
    }
    async findLastByDevice(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            const id=Number(req.params.id)
            if(isNaN(id)){
                res.status(400).json({status:"error","error":{message:`invalid id ${id}`, code:400}})
                return
            }
            const result=await this.repo.findLastBydevice(id)
            res.status(200).json({"status":"success","data":result,"meta":{}})
        } catch (error) {
            next(error)
        }
    }
    async create(req:Request,res:Response,next:NextFunction):Promise<void>{
         try {
            let {variable,value,device_id,measured_at}=req.body
            const measuredAtDate=new Date(measured_at)
            if(!variable || typeof(variable)!=="string") {
            res.status(400).json({status:"error",erro:{message:"variable is invalid or missing",code:400}})
            return
             }
             variable=variable.toLowerCase
             if(!value || typeof(value)!=="number") {
            res.status(400).json({status:"error",erro:{message:"value is invalid or missing",code:400}})
            return
             }
             if(!device_id || typeof(device_id)!=="number") {
            res.status(400).json({status:"error",erro:{message:"device_id is invalid or missing",code:400}})
            return
             }
             if(!measured_at || isNaN(measuredAtDate.getTime())) {
            res.status(400).json({status:"error",erro:{message:"measured_at is invalid or missing",code:400}})
            return
             }
            const result=await this.repo.create({variable,value,device_id,"measured_at":measuredAtDate})
            res.status(200).json({status:"success",data:result,meta:{}})
        } catch (error) {
            next(error)
        }
    }
}