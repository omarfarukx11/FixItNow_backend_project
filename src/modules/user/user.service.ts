import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { createUserPayload } from "./user.interface";
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

  return await prisma.user.create({
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
    include: {
      profile: true,
    },
  });
};

export const UserService = { createUserIntoDB };
