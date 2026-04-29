import "dotenv/config"

const config={
     POSTGRES_HOST : process.env.POSTGRES_HOST,
     POSTGRES_DB : process.env.POSTGRES_DB,
     POSTGRES_USER : process.env.POSTGRES_USER,
     POSTGRES_PASSWORD : process.env.POSTGRES_PASSWORD,
     POSTGRES_PORT : process.env.POSTGRES_PORT,
     API_PORT : process.env.API_PORT,
     JWT_SECRET: process.env.JWT_SECRET,
     JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN   
}

const validateEnv =function<T extends Record<string,string|undefined>>(envVars: T):{[K in keyof T]:string}{
    const validEnv={} as {[K in keyof T]:string}
    for(const key in envVars){
        if(envVars[key]==undefined){
            throw new Error(`Enviroment vairbale ${key} is not defined`)
        }
        validEnv[key]=envVars[key]
    }
    return validEnv
}

export const env=validateEnv(config)
