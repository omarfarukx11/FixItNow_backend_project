import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utility/catchAsync";
import config from "../../config";
import { jwtUtitly } from "../../utility/jwt";
import { userService } from "./user.service";
import { sendResponse } from "../../utility/sendResponse";
import  HttpStatus  from "http-status";

const getMyProfile = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const {accessToken} = req.cookies;
    const verrifyToken = jwtUtitly.verifyToken(accessToken , config.jwt_access_secret)
    if(typeof verrifyToken === "string") {
        throw new Error(verrifyToken)
    }
    const profile = await userService.getMyProfile(verrifyToken.id)
    sendResponse(res , {
        success : true , 
        statusCode : HttpStatus.OK,
        message : "user profile fetched successfully",
        data : profile,
    })
})

export const userController = {getMyProfile}