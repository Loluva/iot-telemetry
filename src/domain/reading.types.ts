export interface Reading{
    id:number,
    device_id:number,
    variable:string,
    value:number,
    measured_at:Date,
    received_at:Date
}