import { prisma } from "../../lib/prisma"

const getAllTechnician = async () => {
  return await prisma.profile.findMany()
}

export const publicService = {
    getAllTechnician
}