import type {Reading} from "./reading.types"

export type CreateReadingDTO=Omit<Reading,"id"|"received_at">
export type findByDeviceAndVarDTO=Pick<Reading,"device_id"|"variable">


export interface ReadingRepository{
    create(data:CreateReadingDTO):Promise<Reading>,
    findByDevice(data:number):Promise<Reading[]>, 
    findByDeviceAndVar(data:findByDeviceAndVarDTO):Promise<Reading[]>,
    findLastBydevice(data:number):Promise<Reading|null>
    findAllByUser(data:number):Promise<Reading[]>
    findAll():Promise<Reading[]>

}
