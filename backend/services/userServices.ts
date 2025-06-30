import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PublicUser, UserCreateInput, UserLoginInput } from "../types/userTypes";
import prisma from "../prisma";

const primsa = new PrismaClient();


export const userCreate = async (
    input: UserCreateInput
): Promise<PublicUser> => {
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


export const userLogin = async({
    email,
    password
}: UserLoginInput) => {

    // Find if the email exists in database
    const user = await primsa.user.findUnique({ where: {email}});
    if (!user) {
        throw new Error('User not found');
    }
    /* Just need to migrate new prisma user type for this to not redline
     TODO: Remember, password func is temporary only for development
    */
    // Check if password matches password saved in DB (BAD TO SAVE PASSWORD)!!
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid Password');
    }
    // If email and password match, assign user a jwt and return
    const token = jwt.sign({ userId: user.id}, 'your_jwt_secret', {expiresIn: '1h'});

    return token;
};

export const userDelete = async(id: string) => {
    /*
TODO: ADD SOME SORT OF CHECK TO MAKE SURE USER WANTS TO DELETE
    */
    const deletedUser = await primsa.user.delete({
        where: {id: id,},
    })
    if (!deletedUser) {
        throw new Error('User not found');
    }
    return;
}

// Simply find a user and return the user
export const getCurrentUser = async(id: string) => {

    const user = await prisma.user.findUnique({where: {id}});
    if (!user) {
        throw new Error('User not found');
    }

    return user;
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
    id: string,
    climbId: string
) => {

    // This query should find a user in the db, and then push the climbId to
    // their ticked climbs list
    const updateUser = await prisma.user.update({
        where: {
            id
        },
        data: {
            tickedId: {
                push: climbId,
            },
        },
    })
    
    if (!updateUser) {
        throw new Error('Something went wrong');
    }
};