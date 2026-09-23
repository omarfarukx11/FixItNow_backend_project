import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utility/catchAsync"
import { sendResponse } from "../../utility/sendResponse"
import { publicService } from "./public.service"
import  HttpStatus from "http-status"

const getAllTechnician = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query
    const result = await publicService.getAllTechnician(query)
    sendResponse(res , {
      success : true,
      statusCode : HttpStatus.OK,
      message : "All Technician info retrieved successfully",
      data : result
    })
})

export const publicController = {
    getAllTechnician,
}