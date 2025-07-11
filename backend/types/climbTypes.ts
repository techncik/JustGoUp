import { Climb } from "@prisma/client";

/*
Climb input types
*/
export interface ClimbCreateInput {
    climbName: string;
    setterId: string;
    grade: number;
}

export interface ClimbDeleteInput {
    climbId: string;
    setterId: string;
}

// When climbs have more fields, (eg beta, photo), add to this type
export interface ClimbEditInput {
    climbName: string;
    setterId: string;
    grade: number;
}

/* 
Climb output types
*/
export interface ClimbCreateOutput {
    message: string;
    climb: Climb;
}

export interface ClimbDeleteOutput {
    message: string;
}

export interface ClimbEditOutput {
    message: string;
    climb: Climb;
}