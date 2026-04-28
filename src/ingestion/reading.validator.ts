import { CreateReadingDTO } from "../domain/reading.repository";

const isCreateReadingDTO=(data:any):data is CreateReadingDTO=>{
    if(!(data instanceof Object) || data==null){
        return false
    }
    const {device_id,variable, value,measured_at}=data
    const measuredAtDate=new Date(measured_at)
    if(typeof device_id!=="number") return false
    if(typeof variable!=="string") return false
    if(typeof value!=="number") return false
    if(typeof measured_at!=="string" || isNaN(measuredAtDate.getTime()))return false
    
    return true
}

export const validateReadingPayload=function (data:unknown):CreateReadingDTO|null{
if(!isCreateReadingDTO(data)) return null

return {...data,measured_at:new Date(data.measured_at)}

}