import {Pool, PoolConfig} from "pg"
import {env} from "./env"

const poolConfig:PoolConfig={
    user:env.POSTGRES_USER,
    database:env.POSTGRES_DB,
    host:env.POSTGRES_HOST,
    password:env.POSTGRES_PASSWORD,
    port:parseInt(env.POSTGRES_PORT, 10),
    connectionTimeoutMillis:5000,
    onConnect: async (client)=>{ const result=await client.query("SELECT NOW() as time")
         console.log(`[DB] connection successful: ${result.rows[0].time}`)
    }
}

export const pool=new Pool(poolConfig)

