import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { categoryController } from "./category.controller";


const route = Router()

route.post("/categories" , auth(Role.ADMIN) , categoryController.createCategory )
route.get("/categories" ,  categoryController.getCategoy )

export const categoryRoute = route