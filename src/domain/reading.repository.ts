import type {Reading} from "./reading.types"

type CreateReadingDTO=Omit<Reading,"id"|"received_at">
type findByDeviceDTO=Pick<Reading,"device_id">
type findByDeviceAndVarDTO=Pick<Reading,"device_id"|"variable">
type findLastByDeviceDTO=Pick<Reading,"device_id">

export interface ReadingRepository{
    create(data:CreateReadingDTO):Promise<Reading>,
    findByDevice(data:findByDeviceDTO):Promise<Reading[]>|null, 
    findByDeviceAndVar(data:findByDeviceAndVarDTO):Promise<Reading[]> |null,
    findLastBydevice(data:findLastByDeviceDTO):Promise<Reading>|null

}
