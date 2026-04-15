import type {Device} from "./device.types"

type CreateDeciveDTO=Omit<Device,"id"|"battery"|"last_connection"|"created_at"|"updated_at">
type FindDeviceByIdDTO=Pick<Device,"id">
type FindDeviceBySerialDTO=Pick<Device,"serial">
type UpdateDeviceDTO=Partial<Omit<Device,"id"|"serial"|"created_at">>
type FindDeviceByUserDTO=Pick<Device,"user_id">

export interface DeviceRepository{
    create(data:CreateDeciveDTO):Promise<Device>,
    findById(data:FindDeviceByIdDTO):Promise<Device>|null,
    findBySerial(data:FindDeviceBySerialDTO):Promise<Device>|null,
    update(id:number, data:UpdateDeviceDTO): Promise<Device>,
    findByUser(data:FindDeviceByUserDTO): Promise<Device[]>|null

}
