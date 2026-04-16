export type APISuccess<T>={
    status:string,
    data:T,
    meta:Record<string,unknown>
}

export type APIError={
    status:string,
    error:{
        message:string,
        code?:string 
    }
}

export type APIResponse<T>=APISuccess<T>|APIError