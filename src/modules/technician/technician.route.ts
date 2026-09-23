import { Router } from "express";

import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { technicianController } from "./technician.controller";


const router  = Router()
router.get("/profile" ,auth(Role.TECHNICIAN) , technicianController.getMyProfile)
router.patch("/profile",auth(Role.TECHNICIAN) , technicianController.updateMyProfile)

export const technicianRouter = router;