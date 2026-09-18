import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getMyProfile = async (userId: string,) => {
  const technicianProfile = await prisma.user.findUniqueOrThrow({
    where: { 
      id: userId 
    },
    omit: { 
      password: true 
    },
    include: { 
      profile: true 
    },
  });

  return technicianProfile;
};

export const profileService = { getMyProfile };