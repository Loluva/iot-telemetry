import { Router } from "express";
import { AuthController } from "./auth.controller";
import { SqlUserRepository } from "../storage/user.repository";

const router=Router()
const controller=new AuthController(new SqlUserRepository())
router.post("/login",controller.login.bind(controller))

export default router
