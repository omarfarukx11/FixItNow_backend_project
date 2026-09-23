import { ProfileWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { QueryInterface } from "./public.interface";

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



export const publicService = {
  getAllTechnician,
};
