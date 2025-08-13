import { PrismaClient} from "@prisma/client";
import { ClimbCreateInput, ClimbDeleteInput, ClimbDeleteOutput, ClimbEditInput, ClimbEditOutput, ClimbGetOutput } from "../types/climbTypes";

const prisma = new PrismaClient();

export const climbCreate = async (
    input: ClimbCreateInput
) => {
    /*
TODO: Differentiate between a user climb and a setter climb
    */
    const newClimb = await prisma.climb.create({
        data: {
            name: input.climbName,
            setterId: input.setterId,
            grade: input.grade,
        },
    });

    return {message: 'New climb created', newClimb};
}


export const climbDelete = async (
    input: ClimbDeleteInput   
): Promise<ClimbDeleteOutput> => {

    const climbToBeDeleted = await prisma.climb.findUnique({
        where: {id: input.climbId}
    });

    if (!climbToBeDeleted) {
        throw new Error('Climb not found');
    }

    // Add a check to see if the user is in the gymOwners list
    if (climbToBeDeleted.setterId != input.setterId) {
        throw new Error('Cannot delete another users climb');
    }

    // Delete the climb
    await prisma.climb.delete({
        where: {id: input.climbId}
    });

    return {message: 'Climb deleted successfully'};
}

// Need a way to get a climb from climbId so that I can edit the same climb
// The way it is, if I am changing the name of the climb, then we won't find
// it in the db as the input.climbName will have a different value to the
// climb in the db
// export const climbGet = async (

// ): Promise<ClimbGetOutput> => {

//     const climb: ClimbGetOutput = await prisma.climb.
    
// };

// // For now just implementing a fairly inefficient edit. Will just check each
// // field and change it if the input is different
// export const climbEdit = async (
//     input: ClimbEditInput
// ): Promise<ClimbEditOutput> => {

//     const climbToEdit = await prisma.climb.findUnique({
//         where: {name: input.climbName}
//     })

// }


export const climbGetAll = async (

): Promise<ClimbGetOutput[]> => {

    const allClimbs = await prisma.climb.findMany();

    if (!allClimbs) {
        throw new Error('Issue getting all climbs');
    }

    return allClimbs;
}



