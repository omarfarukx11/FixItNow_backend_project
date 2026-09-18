import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { profileController } from "./profile.controller";


const roter  = Router()
roter.get("/me" ,auth(Role.TECHNICIAN) , profileController.getMyProfile)

export const profileRouter = roter;