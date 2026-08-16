import { NextFunction, Request, Response } from "express";
import  HttpStatus  from "http-status";
import { UserService } from "./user.service";
import { sendResponse } from "../../utility/sendResponse";

const createUser = async (req : Request , res : Response , next : NextFunction) => {
  const payload = req.body;
  const result = await UserService.createUserIntoDB(payload)
  sendResponse(res , {
    success : true,
    statusCode : HttpStatus.CREATED,
    message : "User register success",
    data : result
  })
  
}

export const userController = {createUser}