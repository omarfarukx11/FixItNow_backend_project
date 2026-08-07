import express, { Application, Request, Response } from "express"
const app : Application = express();

export default app;

app.get("/" , (req : Request, res : Response ) => {
  res.send("hello world")
})