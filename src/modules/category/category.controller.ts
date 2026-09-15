import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utility/sendResponse";
import HttpStatus from "http-status";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await categoryService.createCategory(payload);
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: "Category Created Successfully",
      data: result,
    });
  },
);

const getCategoy = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const result = await categoryService.getCategory();
    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Categories Retrieved Successfully",
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getCategoy,
};
