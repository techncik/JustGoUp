import express from "express";
import { Request, Response } from "express";


// Need to define what sort of information creating a climb will come with

// Dont need to authorize, will be done by middleware
export const climbCreate = async (req: Request, res: Response) => {
    try {
        const {climbName, setterId, grade} = req.body;
        const newClimb = await climbServices.climbCreate(
            climbName, setterId, grade
        );
        res.status(200).json({messasge: 'Climb created successfully'});
    } catch (err) {
        /*
        TODO Add better error checking. This is going to be called regardless
        of the error. Need more descriptive error messages
        */
        res.status(400).json({error: 'Error creating climb'});
    }
};
