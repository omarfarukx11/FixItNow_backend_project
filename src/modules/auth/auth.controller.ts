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
  const {accessToken , refreshToken} = await authService.loginUserIntoDB(payload)
  res.cookie("accessToken" , accessToken , {
    httpOnly : true,
    secure : false,
    sameSite : "none",
    maxAge : 1000 * 60 * 60 * 24
  })
  res.cookie("refreshToken" , refreshToken , {
    httpOnly : true,
    secure : false,
    sameSite :"none",
    maxAge : 1000 * 60 * 60 * 24 * 7
  })
  sendResponse(res , {
    success : true,
    statusCode : HttpStatus.OK,
    message : "user login successfully",
    data : {accessToken , refreshToken}
  })
})
const getCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const result = await authService.getCurrentUser(id as string)
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "User info reatrieved successfully",
      data: result,
    });
})

export const authController = { 
  createUser,
  loginUser,
  getCurrentUser,
};
