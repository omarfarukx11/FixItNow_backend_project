import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";
import { serviceContoller } from "./service.controller";

const route = Router();
route.post("/services" , auth(Role.TECHNICIAN) , serviceContoller.createServices)

export const serviceRoute = route;
