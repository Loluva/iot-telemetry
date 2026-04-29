import { Timestamps } from "./base.types";

export interface User extends Timestamps{
    id:number,
    email:string,
    password_hash:string,
    role:"user"|"admin",
}

export type PublicUser=Omit<User,"password_hash">