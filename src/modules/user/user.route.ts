import { Router } from "express";
import { userController } from "./user.controller";


const roter  = Router()
roter.post("/me" , userController.getMyProfile)

export const userRouter = roter;