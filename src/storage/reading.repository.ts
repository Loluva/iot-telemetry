import { pool } from "../config/database";
import { CreateReadingDTO, findByDeviceAndVarDTO, ReadingRepository } from "../domain/reading.repository";
import { Reading } from "../domain/reading.types";

export class sqlReadingRepository implements ReadingRepository{
    async findByDevice(data: number): Promise<Reading[]> {
        const result= await pool.query("SELECT * FROM readings WHERE device_id=$1",[data])
        return result.rows
    }
    async findByDeviceAndVar(data: findByDeviceAndVarDTO): Promise<Reading[]> {
        const {device_id,variable}=data
        const result= await pool.query("SELECT * FROM readings WHERE device_id=$1 AND variable=$2",[device_id,variable])
        return result.rows
    }
    async findLastBydevice(data: number): Promise<Reading| null>  {
        const result= await pool.query("SELECT * FROM readings WHERE device_id=$1  ORDER BY measured_at DESC LIMIT 1",[data])
        if(result.rows.length===0) return null
        return result.rows[0]
    }
    async create(data: CreateReadingDTO): Promise<Reading> {
        const {device_id,variable,value,measured_at}=data
        const result=await pool.query("INSERT INTO readings (device_id,variable,value,measured_at) VALUES ($1,$2,$3,$4) RETURNING *",[device_id,variable,value,measured_at])
        return result.rows[0]
    }
}