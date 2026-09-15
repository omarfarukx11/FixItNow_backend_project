import { prisma } from "../../lib/prisma";
import { CategoryInterface } from "./category.interface";

const createCategory = async (payload: CategoryInterface) => {
  const { name, description } = payload;
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (isCategoryExist) {
    throw new Error("Category is already registered");
  }

  const createCategory = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });
  return createCategory;
};

export const categoryService = {
  createCategory,
};
