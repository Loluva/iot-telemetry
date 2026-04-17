import { Router } from "express";
import { ReadingController } from "./reading.controller";
import { SqlReadingRepository } from "../storage/reading.repository";

const readingRouter=Router()
const controller=new ReadingController(new SqlReadingRepository())
readingRouter.get("/device/:id",controller.findByDevice.bind(controller))
readingRouter.get("/device/:id/:variable",controller.findByDeviceAndVar.bind(controller))
readingRouter.get("/device/last/:id",controller.findLastByDevice.bind(controller))
readingRouter.post("/",controller.create.bind(controller))

export default readingRouter