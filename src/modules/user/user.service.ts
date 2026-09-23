
import { Role } from "../../../prisma/generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    where : {
      role : {
        in : [Role.CUSTOMER , Role.TECHNICIAN]
      }
    }
  })
  return result
}

export const adminService = { getAllUsers };