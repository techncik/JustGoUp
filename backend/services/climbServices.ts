import { PrismaClient} from "@prisma/client";
import prisma from "../prisma";
import { CreateClimbInput, ClimbDeleteInput } from "../types/climbTypes";

const prisma = new PrismaClient();

export const climbCreate = async ({climbName, setterId, grade}: CreateClimbInput) => {
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


export const climbDelete = async ({
    climbId, setterId
    }: ClimbDeleteInput   
) => {

    const climbToBeDeleted = await prisma.climb.findUnique({
        where: {id: climbId}
    });

    if (!climbToBeDeleted) {
        throw new Error('Climb not found');
    }

    // Add a check to see if the user is in the gymOwners list
    if (climbToBeDeleted.setterId != setterId) {
        throw new Error('Cannot delete another users climb');
    }

    // Delete the climb
    await prisma.climb.delete({
        where: {id: climbId}
    });

    return;
}



