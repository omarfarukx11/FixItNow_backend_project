import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import config from "../../config";
import { jwtUtitly } from "../../utility/jwt";

import { sendResponse } from "../../utility/sendResponse";
import HttpStatus from "http-status";
import { technicianService } from "./technician.service";

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    const verrifyToken = jwtUtitly.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );
    if (typeof verrifyToken === "string") {
      throw new Error(verrifyToken);
    }
    const profile = await technicianService.getMyProfile(verrifyToken.id);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "user profile fetched successfully",
      data: profile,
    });
  },
);

const updateMyProfile = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
  const id = req.user?.id;
  const payload = req.body;
  const result = await technicianService.updateMyProfile(id as string , payload)
  sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Profile Updated successfully",
      data: result,
    });
})

export const technicianController = {
  getMyProfile,
  updateMyProfile,
};
