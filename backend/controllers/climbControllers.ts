import express from "express";
import { Request, Response } from "express";
import * as climbServices from "../services/climbServices";
import { ClimbCreateInput, ClimbDeleteInput, ClimbEditInput, ClimbGetOutput } from "../types/climbTypes";



// Need to define what sort of information creating a climb will come with

// Dont need to authorize, will be done by middleware
export const climbCreate = async (
    req: Request, 
    res: Response
) => {
    try {
        const {climbName, setterId, grade} = req.body;
        const newClimb = await climbServices.climbCreate({
            climbName,
            setterId, 
            grade
        });
        res.status(200).json({messasge: 'Climb created successfully', climb: newClimb});
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

/*
Two things need to be done here
- Need a way to list all climbs and basic info (eg name, grade, setter?)
- Need a way to then 
*/
export const climbGet = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        

        const climb:ClimbGetOutput = await climbServices.climbGet();

        res.status(200).json({
            message: 'Climb successfully received',
            data: climb,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Failed to retreive climb',
        })
    }
}

export const climbGetAll = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {
        const allClimbs:Array<ClimbGetOutput> = await climbServices.climbGetAll();

        res.status(200).json({
            message: 'All climbs retrieved',
            data: allClimbs,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Failed to retrieve all climbs'
        })
    }
}