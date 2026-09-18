import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const route = Router()
route.get("/me" , auth(Role.ADMIN) , userController.getAllUsers)

export const userRouter = route;