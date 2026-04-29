import { Router } from "express";
import { DeviceController } from "./device.controller";
import { SqlDeviceRepository } from "../storage/device.repository";

const router=Router()
const controller=new DeviceController(new SqlDeviceRepository())
router.get("/",controller.findAll.bind(controller))
router.get("/serial/:serial",controller.findBySerial.bind(controller))
router.get("/:id",controller.findById.bind(controller))
router.post("/",controller.create.bind(controller))
router.patch("/:id",controller.update.bind(controller))

export default router