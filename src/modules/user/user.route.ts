import { adminController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { Router } from "express";


const router = Router()
router.get("/users" , auth(Role.ADMIN) , adminController.getAllUsers)

export const adminRouter = router;