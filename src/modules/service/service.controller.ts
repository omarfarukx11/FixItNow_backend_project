import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utility/sendResponse";
import HttpStatus from "http-status";

const createServices = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;
    const result = await serviceService.createService(id as string, payload);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "New Service Created",
      data: result,
    });
  },
);

export const serviceContoller = {
  createServices,
};
