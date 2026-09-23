import { Role } from "../../../prisma/generated/prisma/enums";
import { ProfileWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { QueryInterface, UpdateProfileInterface } from "./technician.interface";

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

const getAllTechnician = async (query: QueryInterface) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy;
  const andCondition: ProfileWhereInput[] = [];

  // Search
  if (query.searchTerm) {
    andCondition.push({
      OR: [
        {
          location: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Expreience
  if (query.min_experience || query.max_experience) {
    andCondition.push({
      experience_years: {
        ...(query.min_experience && {
          gte: Number(query.min_experience),
        }),
        ...(query.max_experience && {
          lte: Number(query.max_experience),
        }),
      },
    });
  }

  //Hourly Rate
  if (query.min_rate || query.max_rate) {
    andCondition.push({
      hourly_rate: {
        ...(query.min_rate && {
          gte: Number(query.min_rate),
        }),
        ...(query.max_rate && {
          lte: Number(query.max_rate),
        }),
      },
    });
  }

  // Review count
  if (query.min_reviews) {
    andCondition.push({
      review_count: {
        gte: Number(query.min_reviews),
      },
    });
  }

  // Location
  if (query.location) {
    andCondition.push({
      location: {
        contains: query.location,
        mode: "insensitive",
      },
    });
  }

  const result = await prisma.profile.findMany({
    where: {
      AND: andCondition,
    },
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalTechnicianCount = await prisma.profile.count({
    where: {
      AND: andCondition,
    },
  });

  return {
    data : result ,
    meta : {
        page,
        limit,
        totalTechnicianCount,
        totalPage : Math.ceil(totalTechnicianCount / limit)
    }
  }
};

export const technicianService = {
  getMyProfile,
  updateMyProfile,
  getAllTechnician
};
