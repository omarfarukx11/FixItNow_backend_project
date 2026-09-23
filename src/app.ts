import express, { Application, Request, Response } from "express"
const app : Application = express();
import cors from "cors";

import config from "./config";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/user/user.route";
import { categoryRoute } from "./modules/category/category.route";
import { serviceRoute } from "./modules/service/service.route";
import { technicianRouter } from "./modules/technician/technician.route";


app.use(cors({origin : config.app_url , credentials : true}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/" , (req : Request, res : Response ) => {
  res.send("hello world")
})

app.use("/api/auth" , authRouter)
app.use("/api/technician" , technicianRouter)
app.use("/api/user" , userRouter)
app.use("/api/v1" , categoryRoute , serviceRoute)


export default app;