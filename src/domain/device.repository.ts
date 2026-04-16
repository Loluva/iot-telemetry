import type {Device} from "./device.types"

export type CreateDeciveDTO=Omit<Device,"id"|"battery"|"last_connection"|"created_at"|"updated_at">
export type UpdateDeviceDTO=Partial<Omit<Device,"id"|"serial"|"created_at">>

export interface DeviceRepository{
    create(data:CreateDeciveDTO):Promise<Device>,
    findById(data:number):Promise<Device|null>,
    findBySerial(data:string):Promise<Device|null>,
    update(id:number, data:UpdateDeviceDTO): Promise<Device|null>,
    findByUser(data:number): Promise<Device[]>

}
