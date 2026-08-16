import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";

import { sendResponse } from "../../utility/sendResponse";
import { catchAsync } from "../../utility/catchAsync";
import { authService } from "./auth.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authService.createUserIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "User register success",
      data: result,
    });
  },
);

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  const result = await authService.loginUserIntoDB(payload)
  sendResponse(res , {
    success : true,
    statusCode : HttpStatus.OK,
    message : "user login successfully",
    data : result
  })
})


export const authController = { 
  createUser,
  loginUser
};
