import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { categoryController } from "./category.controller";


const router = Router()

router.post("/categories" , auth(Role.ADMIN) , categoryController.createCategory )
router.get("/categories" ,  categoryController.getCategoy )
router.get("/categories/:id" ,  categoryController.getSingleCategory )
router.patch("/categories/:id" , auth(Role.ADMIN),  categoryController.updateCategory )
router.delete("/categories/:id" , auth(Role.ADMIN),  categoryController.deleteCategory )

export const categoryRouter = router