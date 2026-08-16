import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { createUserPayload, LoginPayload } from "./auth.interface";
import { Role } from "../../../prisma/generated/prisma/enums";

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

const loginUserIntoDB = async (payload : LoginPayload) => {
  const {email , password} = payload;
  const user = await prisma.user.findFirstOrThrow({
    where : {
        email,
    },
  })
 
  const isPasswordMatch = await bcrypt.compare(password , user.password)
  if(!isPasswordMatch) {
    throw new Error("password is incorrect")
  }
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}


export const authService = {
  createUserIntoDB,
  loginUserIntoDB,
};
