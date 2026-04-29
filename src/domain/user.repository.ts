import { PublicUser, User } from "./user.types";

export interface  IUserRepository{
    findUserById(id:number):Promise<PublicUser|null>
    findUserByEmail(email:string):Promise<User|null>
}