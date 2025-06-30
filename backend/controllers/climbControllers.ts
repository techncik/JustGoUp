import express from "express";
import { Request, Response } from "express";
import * as climbServices from "../services/climbServices";
import { ClimbCreateInput, ClimbDeleteInput, ClimbEditInput } from "../types/climbTypes";



// Need to define what sort of information creating a climb will come with

// Dont need to authorize, will be done by middleware
export const climbCreate = async (req: Request, res: Response) => {
    try {
        const {climbName, setterId, grade} = req.body;
        const newClimb = await climbServices.climbCreate({
            climbName,
            setterId, 
            grade
        });
        res.status(200).json({messasge: 'Climb created successfully'});
    } catch (err) {
        /*
        TODO Add better error checking. This is going to be called regardless
        of the error. Need more descriptive error messages
        */
        res.status(400).json({error: 'Error creating climb'});
    }
};

// To delete a climb, we probably need to check if the user deleting the climb
// either:
// -created the climb
// -is a gym owner
export const climbDelete = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const climb:ClimbDeleteInput = req.body;
        await climbServices.climbDelete(climb);

        res.status(200).json({message: 'Climb deleted successfully'});
    } catch (err) {
        res.status(400).json({error: "Problem deleting the climb"});
    }
};


export const climbEdit = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const climb:ClimbEditInput = req.body;
        await climbServices.climbEdit(climb);

        res.status(200).json({message: 'Climb successfully edited'});
    } catch (err) {
        res.status(400).json({error: 'Problem editing the climb'});
    }
}