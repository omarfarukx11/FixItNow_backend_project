import express, { Application, Request, Response } from "express"
const app : Application = express();
import cors from "cors";

import config from "./config";
import cookieParser from "cookie-parser";
import { authrouter } from "./modules/auth/auth.route";
import { categoryRouter } from "./modules/category/category.route";
import { serviceRouter } from "./modules/service/service.route";
import { technicianrouter } from "./modules/technician/technician.route";
import { adminRouter } from "./modules/user/user.route";



app.use(cors({origin : config.app_url , credentials : true}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/" , (req : Request, res : Response ) => {
  res.send("hello world")
})


app.use("/api/auth" , authrouter)
app.use("/api/technician" , technicianrouter)
app.use("/api" , technicianrouter)
app.use("/api/admin" , adminRouter)
app.use("/api" , categoryRouter )
app.use("/api" , serviceRouter)


export default app;