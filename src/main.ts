import e  from "express"
import deviceRouter from "./api/device.router"
import { errorMiddleware } from "./api/error.middleware"
import { env } from "./config/env"
import readingRouter from "./api/reading.router"

const app=e()
const port=env.API_PORT
//Pre-built Middleware
app.use(e.json())

//Routes
app.use("/api/v1/devices",deviceRouter)
app.use("/api/v1/readings",readingRouter)
//Custom Error Middleware
app.use(errorMiddleware)

app.listen(port,()=>console.log(`listen on port ${port}`))

import "./ingestion/mqtt.simulator";