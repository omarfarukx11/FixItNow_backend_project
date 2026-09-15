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

const getSingleCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  const result = await categoryService.getSingleCategory(id as string)
  sendResponse(res , {
    success: true,
      statusCode: HttpStatus.OK,
      message: "Single Categories Retrieved Successfully",
      data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
   const payload = req.body;
  const id = req.params.id
  const result = await categoryService.updateCategory(id as string , payload)
  sendResponse(res , {
    success: true,
      statusCode: HttpStatus.OK,
      message: "Category Update Successfully",
      data: result,
  })
})

export const categoryController = {
  createCategory,
  getCategoy,
  getSingleCategory,
  updateCategory
};
