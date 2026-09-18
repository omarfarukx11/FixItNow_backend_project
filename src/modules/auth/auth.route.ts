import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../prisma/generated/prisma/enums";
import { auth } from "../../middlewares/auth";


const router = Router()

router.post("/register" , authController.createUser)
router.post("/login" , authController.loginUser)



export const authRouter = router;