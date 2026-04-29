import e  from "express"
import { authMiddleware } from "./api/auth/auth.middleware"
import deviceRouter from "./api/device.router"
import authRouter from "./api/auth.router"
import readingRouter from "./api/reading.router"
import { errorMiddleware } from "./api/error.middleware"
import { env } from "./config/env"


const app=e()
const port=env.API_PORT
//Pre-built Middleware
app.use(e.json())

//Routes
app.use("/api/v1/auth",authRouter)

//authMiddleware
app.use(authMiddleware)

app.use("/api/v1/devices",deviceRouter)
app.use("/api/v1/readings",readingRouter)
//Custom Error Middleware
app.use(errorMiddleware)

app.listen(port,()=>console.log(`listen on port ${port}`))

import "./ingestion/mqtt.simulator";


