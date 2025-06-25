import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserInput } from "../types/userTypes";
import prisma from "../prisma";

const primsa = new PrismaClient();


export const createUser = async ({username, email, password}: CreateUserInput) => {
    // hash password. temporary for development
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creates new user in prisma user table
    const user = await primsa.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        },
    });

    return user;

}


export const loginUser = async(email: string, password: string) => {

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

// Simply find a user and return the user
export const  getCurrentUser = async(email: string) => {

    const user = await prisma.user.findUnique({where: {email}});
    if (!user) {
        throw new Error('User not found');
    }

    return user;
}