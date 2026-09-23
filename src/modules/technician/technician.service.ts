import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UpdateProfileInterface } from "./technician.interface";

const getMyProfile = async (userId: string) => {
  const technicianProfile = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return technicianProfile;
};

const updateMyProfile = async (
  userId: string,
  payload: UpdateProfileInterface,
) => {
  const {
    name,
    profilePhoto,
    bio,
    experience_years,
    location,
    hourly_rate,
    availability_slots,
  } = payload;

  const getProfile = await prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!getProfile) {
    throw new Error("user profile is not found");
  }
  const result = await prisma.$transaction(async (tx) => {
    if (name !== undefined) {
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
        },
      });
    }

    const updateProfile = await tx.profile.update({
      where: {
        userId,
      },
      data: {
        profilePhoto,
        bio,
        experience_years,
        location,
        hourly_rate,
        availability_slots,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
    return updateProfile;
  });
  return result;
};



export const technicianService = {
  getMyProfile,
  updateMyProfile,
};
