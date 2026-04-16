import { pool } from "../config/database";
import { CreateDeciveDTO, DeviceRepository, UpdateDeviceDTO} from "../domain/device.repository";
import { Device } from "../domain/device.types";
export class SqlDeviceRepository implements DeviceRepository{
    async findById(data:number):Promise<Device|null> {
        const result=await pool.query("SELECT * FROM devices WHERE id=$1",[data])
        if (result.rows.length==0)  return null
        return result.rows[0]
    }
    async findBySerial(data: string): Promise<Device | null> {
        const result = await pool.query("SELECT * FROM devices WHERE serial=$1",[data])
        if(result.rows.length===0) return null
        return result.rows[0]
    }
    async findByUser(data: number): Promise<Device[]> {
          const result = await pool.query("SELECT * FROM devices WHERE user_id=$1",[data])
          return result.rows
    }
    async create(data: CreateDeciveDTO): Promise<Device> {
        const {serial,user_id=null}=data
        const result=await pool.query("INSERT INTO devices (serial,user_id) VALUES ($1,$2) RETURNING *",[serial,user_id])
        return result.rows[0] 
    }
    async update(id: number, data: UpdateDeviceDTO): Promise<Device|null> {
        if(Object.keys(data).length===0) throw new Error("No parameters to update")

        const setClause=Object.keys(data).map((key,i)=>`${key}=$${i+1}`).join(",")
        const values=Object.values(data)
        values.push(id)
        const result =await pool.query(`UPDATE devices SET ${setClause} WHERE id=$${values.length} RETURNING *`,values )
        if (result.rows.length === 0) return null;  
        return result.rows[0]
    }
}