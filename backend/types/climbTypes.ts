export interface CreateClimbInput {
    climbName: string;
    setterId: string;
    grade: number;
}

export interface ClimbDeleteInput {
    climbId: string;
    setterId: string;
}