import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserPublic, UserCreateInput, UserLoginInput, LoginPublic, UserDeleteInput, UserDeleteOutput, UserTickClimb, TickClimbOutput} from "../types/userTypes";
import prisma from "../prisma";

const primsa = new PrismaClient();


export const userCreate = async (
    input: UserCreateInput
): Promise<UserPublic> => {
    // hash password. temporary for development
    const hashedPassword = await bcrypt.hash(input.password, 10);
    // Creates new user in prisma user table
    const user = await primsa.user.create({
        data: {
            ...input,
            password: hashedPassword
        },
    });

    // Take password out of user and store the rest in safeUser
    const { password, ...safeUser } = user;
    return safeUser;
}


export const userLogin = async(
    input: UserLoginInput
): Promise<LoginPublic> => {

    // Find if the email exists in database
    const user = await primsa.user.findUnique({ where: {email: input.email}});
    if (!user) {
        throw new Error('User not found');
    }
    
    // Check if password matches password saved in DB (BAD TO SAVE PASSWORD)!!
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid Password');
    }
    // If email and password match, assign user a jwt and return
    const token = jwt.sign({ userId: user.id}, 'your_jwt_secret', {expiresIn: '1h'});
    const output = {id: user.id, token, username: user.username};
    return output;
};

export const userDelete = async(
    input: UserDeleteInput
): Promise<UserDeleteOutput> => {
    /*
TODO: ADD SOME SORT OF CHECK TO MAKE SURE USER WANTS TO DELETE
    */
    const user = await prisma.user.findUnique({
    where: {id: input.id}
    });
    if (!user) {
        throw new Error('User not found');
    }
    await prisma.user.delete({
        where: {id: input.id}
    });
    
    return {message: 'User successfully deleted', deletedUserId: input.id};
}

// Simply find a user and return the user
export const getCurrentUser = async(
    userId: string
): Promise<UserPublic> => {

    const user = await prisma.user.findUnique({where: {id: userId}});
    if (!user) {
        throw new Error('User not found');
    }
    const { password, ...safeUser} = user;
    return safeUser;
}

export const userInfoUpdate = async(
    id: string
) => {

    // Get user object
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) {
        throw new Error('User not found');
    }
}

// A user will be calling this. So we find in the db that user, and update
// their climbId list with the climbs id
// This function is passed id and climbId. Id should correlate to the users
// id, and climb id is the idea of the climb they are ticking.
export const userTickClimb = async(
    input: UserTickClimb
): Promise<TickClimbOutput> => {

    // This query should find a user in the db, and then push the climbId to
    // their ticked climbs list
    const updateUser = await prisma.user.update({
        where: {
            id: input.id
        },
        data: {
            tickedId: { //TODO Believe this error just comes from prisma not being migrated
                push: input.climbId,
            },
        },
    })
    
    if (!updateUser) {
        throw new Error('Something went wrong');
    }
    return {message: 'Climb successfully ticked'};
};