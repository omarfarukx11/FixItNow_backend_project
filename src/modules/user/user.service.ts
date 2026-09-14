import { prisma } from "../../lib/prisma"


const getMyProfile = async (userId : string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where : { id : userId},
        omit : {password : true},
        include : {profile : true}
    })

    return user
}

export const userService = {getMyProfile}