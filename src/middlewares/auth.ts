import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utility/catchAsync";
import { jwtUtitly } from "../utility/jwt";
import config from "../config";
import { Role } from "../../prisma/generated/prisma/enums";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma"; 


declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        id: string;
        role: Role;
      };
    }
  }
}

export const auth = (...requiredRole: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("You are not logged in. Please log in to access this resource.");
    }

    const verifiedToken = jwtUtitly.verifyToken(token, config.jwt_access_secret) as JwtPayload;

    if (!verifiedToken) {
      throw new Error("Invalid or expired token.");
    }

    const userData = (verifiedToken.data || verifiedToken) as JwtPayload;

    const { email, name, id, role } = userData;

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error("Forbidden, you don't have permission to access this resource.");
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User does not exist.");
    }

    if (user.is_banned) {
      throw new Error("Your account is blocked. Please contact support.");
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    next();
  });
};