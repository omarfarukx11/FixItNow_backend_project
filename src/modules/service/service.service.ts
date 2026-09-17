import { prisma } from "../../lib/prisma";
import { ServiceInterface } from "./service.interface";

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

export const serviceService = {
  createService,
};
