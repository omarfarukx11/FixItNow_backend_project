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

const getCategory = async () => {
  const result = await prisma.category.findMany();
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const categoryService = {
  createCategory,
  getCategory,
  getSingleCategory,
};
