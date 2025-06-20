import { Request, Response } from "express";
import * as userServices from '../services/userServices'
import { error } from "console";
import { request } from "http";

// Controllers should only handle web specific things. Business logic
// can go into services

export const userRegister = async (req: Request, res: Response) => {
    try {
        // req.body should present the information in this format.
        // eg req.body = {username: "abc", email: "abc@email.com", password: "abc123"}
        const {username, email, password} = req.body;

        // Send this data to the userServices createUser function and get the
        const newUser = await userServices.createUser({username, email, password});

        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (err) {
        // Something went wrong in user creation.
        // TODO: Add more indepth errors. Why did something go wrong?
        res.status(500).json({error: 'Failed to create user'});
    }
};

export const userLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        
        // Send the email/password data from the request to the userServices
        // function for logging in. Should return a jwt if successful
        const token = await userServices.loginUser(email, password);

        res.status(200).json({message: 'Login successful', token});
    } catch (err) {
        res.status(401).json({error: "Invalid credentials"});
    }
};




// Need some controlls for users to create a gym maybe? It is a thing that
// a user can do. But needs confirmation of some sort.
// Maybe need a gym object?? Not worth passing all the things to this function
// eg type gymInfo: gymName, gymLocation, adminUser eg eg
export const userGymRegister = async (req: Request, res: Response) => {
    try {
        const {}
    }
}