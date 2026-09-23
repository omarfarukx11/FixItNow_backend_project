import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { serviceContoller } from "./service.controller";

const router = Router();
router.post("/services" , auth(Role.TECHNICIAN) , serviceContoller.createServices)

export const serviceRouter = router;
