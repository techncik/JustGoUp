import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const primsa = new PrismaClient();

interface CreateUserInput {
    username: string;
    email: string;
    password: string;
}

export const createUser = async ({username, email, password}: CreateUserInput) => {
    // hash password. temporary for development
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await primsa.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    return user;

}


export const loginUser = async(email: string, password: string) => {
    const user = await primsa.user.findUnique({ where: {email}});

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({ userId: user.id}, 'your_jwt_secret', {expiresIn: '1h'});

    return token;
};