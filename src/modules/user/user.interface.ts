import { Role } from "../../../prisma/generated/prisma/enums";

export interface createUserPayload {
    name : string,
    email : string,
    password : string,
    role : Role,
    profilePhoto : string,
    bio : string
}