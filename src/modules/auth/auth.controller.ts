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
  const {accessToken , refershToken} = await authService.loginUserIntoDB(payload)
  res.cookie("accessToken" , accessToken , {
    httpOnly : true,
    secure : false,
    sameSite : "none",
    maxAge : 1000 * 60 * 60 * 24
  })
  res.cookie("refreshToken" , refershToken , {
    httpOnly : true,
    secure : false,
    sameSite :"none",
    maxAge : 1000 * 60 * 60 * 24 * 7
  })
  sendResponse(res , {
    success : true,
    statusCode : HttpStatus.OK,
    message : "user login successfully",
    data : {accessToken , refershToken}
  })
})

export const authController = { 
  createUser,
  loginUser,
};
