import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { profileController } from "./profile.controller";


const roter  = Router()
roter.get("/profile" ,auth(Role.TECHNICIAN) , profileController.getMyProfile)
roter.patch("/profile",auth(Role.TECHNICIAN) , profileController.updateMyProfile)

export const profileRouter = roter;