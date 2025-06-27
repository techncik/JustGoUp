import { Request, Response } from "express";
import * as userServices from '../services/userServices'
import { error } from "console";
import { request } from "http";

// Controllers should only handle web specific things. Business logic
// can go into services

export const userRegister = async (req: Request, res: Response) => {
    try {
        // Deconstruct the input data from the request and send to services
        const {username, email, password} = req.body;
        const newUser = await userServices.createUser({username, email, password});

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
        const {email, password} = req.body;
        const token = await userServices.loginUser(email, password);

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
        const {id} = req.body;
        await userServices.userDelete(id);

        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(401).json({error: "Not allowed"});
    }
};

// Function to simply get the user from the database and display info for now
// They will be authenticated already at this point using jwt
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;
        const loggedInUser = await userServices.getCurrentUser(email);

        res.status(200).json({message: 'User details retrieved', user: loggedInUser});
    } catch (err) {
        // TODO: Change status, invaid credentials will occur in middleware
        res.status(404).json({error: "User not found"});
    }
};