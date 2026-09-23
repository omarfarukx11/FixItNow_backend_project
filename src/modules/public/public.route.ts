import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router()

router.get("/technicians", publicController.getAllTechnician)

export const publicRoute = router