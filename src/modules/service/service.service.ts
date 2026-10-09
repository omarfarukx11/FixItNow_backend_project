import { ServiceWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { ServiceInterface, ServiceQueryInterface} from "./service.interface";

const createService = async (profileId: string, payload: ServiceInterface) => {
  const { category_id, title, description, price } = payload;

  const profile = await prisma.profile.findUnique({
    where: {
      userId : profileId,
    },
  });

  if (!profile) {
    throw new Error("Technician profile not found");
  }

  if (title.length < 5 || title.length > 100) {
    throw new Error("Service title must be between 5 and 100 characters");
  }

  const result = await prisma.service.create({
    data: {
      technician_id: profile.id,
      category_id,
      title,
      description,
      price,
    },
  });

  return result;
};


const getAllServices = async (query : ServiceQueryInterface) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const andCondition : ServiceWhereInput[] = []

  if(query.searchTerm) {
    andCondition.push({
      OR : [
        {
          title :{
            contains : query.searchTerm,
            mode : "insensitive"
          },
        },
          {
            description : {
              contains : query.searchTerm,
              mode : "insensitive"
            }
          }
      ]
    })
  }
  // Price filter
  if(query.minPrice || query.maxPrice) {
    andCondition.push({
      price : {
        ...(query.minPrice && {
          gte : Number(query.minPrice)
        }),
        ...(query.maxPrice && {
          lte : Number(query.maxPrice)
        }),
      }
    })
  }
  

}

export const serviceService = {
  createService,
  getAllServices
};

