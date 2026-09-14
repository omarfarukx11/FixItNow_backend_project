import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const roter  = Router()
roter.get("/me" ,auth(Role.TECHNICIAN) , userController.getMyProfile)

export const userRouter = roter;