import type {Timestamps} from "./base.types" 
export interface Device extends Timestamps {
    id:number,
    serial:string,
    user_id?:number,
    battery?:number
    last_connection?:Date,


}