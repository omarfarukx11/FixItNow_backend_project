import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { adminService } from "./user.service";
import { sendResponse } from "../../utility/sendResponse";
import  HttpStatus  from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUsers()
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "All Users Retrieved Successfully",
      data: result,
    });
})

export const adminController = {getAllUsers}