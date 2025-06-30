import { Request, Response } from "express";
import * as userServices from '../services/userServices'
import { error } from "console";
import { request } from "http";
import { UserCreateInput, UserDeleteInput, UserLoginInput, UserTickClimb } from "../types/userTypes";

// Controllers should only handle web specific things. Business logic
// can go into services

export const userRegister = async (req: Request, res: Response) => {
    try {
        // Deconstruct the input data from the request and send to services
        const userCreateData: UserCreateInput = req.body;
        const newUser = await userServices.userCreate(userCreateData);

        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (err) {
        // Something went wrong in user creation.
        // TODO: Add more indepth errors. Why did something go wrong?
        res.status(500).json({error: 'Failed to create user'});
    }
};


// After using login successfully, user will have a jwt to then perform 
// auth requiring tasks
export const userLogin = async (req: Request, res: Response) => {
    try {

        // Deconstruct req.body and send to services loging function
        const userLoginData: UserLoginInput = req.body;
        const token = await userServices.userLogin(userLoginData);

        // Send token back in response
        res.status(200).json({message: 'Login successful', token});
    } catch (err) {
        res.status(401).json({error: "Invalid credentials"});
    }
};

// Function to delete a user
export const userDelete = async (req: Request, res: Response) => {
    try {
        // Req.body should contain the user object
        const user:UserDeleteInput = req.body;
        await userServices.userDelete(user);

        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(401).json({error: "Not allowed"});
    }
};

// Function to simply get the user from the database and display info for now
// They will be authenticated already at this point using jwt
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({error: 'Not authorized'});
        }

        const loggedInUser = await userServices.getCurrentUser(userId);

        res.status(200).json({message: 'User details retrieved', user: loggedInUser});
    } catch (err) {
        // TODO: Change status, invaid credentials will occur in middleware
        res.status(404).json({error: "User not found"});
    }
};

export const userTickClimb = async (req: Request, res: Response) => {
    try {

        const tickClimb: UserTickClimb = req.body;
        const tickedClimb = await userServices.userTickClimb(tickClimb);

        res.status(202).json({message: 'Ticked climb successfully'});
    } catch (err) {
        res.status(400).json({error: 'Unsuccessful climb tick'});
    }
};
