import { PrismaClient, User } from "@prisma/client";
import prisma from "../prisma";
import { CreateClimbInput } from "../types/climbTypes";
import { climbCreate } from "../controllers/climbControllers";

const prisma = new PrismaClient();

export const createClimb = async ({climbName, setterId, grade}: CreateClimbInput) => {
    /*
TODO: Differentiate between a user climb and a setter climb
    */
    const newClimb = await prisma.climb.create({
        data: {
            name: climbName,
            setterId: setterId,
            grade: grade,
        },
    });

    return newClimb;
}

// A climb will have the ability to be ticked by a user. A climb calls this
// method and updates the users ticked climbs

// Might be better to do this from the user but not sure
export const climbTick = async(user: User) =>


