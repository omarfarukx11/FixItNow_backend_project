import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { createUserPayload, LoginPayload } from "./auth.interface";
import { Role } from "../../../prisma/generated/prisma/enums";
import jwt, { SignOptions } from 'jsonwebtoken'
import { jwtUtitly } from "../../utility/jwt";




const createUserIntoDB = async (payload: createUserPayload) => {
  const { email, name, password, role, profilePhoto, bio } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("user is already registered");
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === Role.TECHNICIAN && {
        profile: {
          create: {
            profilePhoto,
            bio,
          },
        },
      }),
    },
  });

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: createUser.id,
      email: createUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const loginUserIntoDB = async (payload: LoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.is_banned) {
    throw new Error("You are banned");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtitly.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );

  const refreshToken = jwtUtitly.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getCurrentUser = async (id : string) => {
  const result = await prisma.user.findUnique({
    where : {id},
    omit : {
      password : true,
    }
  })
  return result
}


export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
  getCurrentUser,
};
