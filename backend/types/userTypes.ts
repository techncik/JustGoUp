/*
User function input types
*/

export interface UserCreateInput {
    username: string;
    email: string;
    password: string;
}

export interface UserLoginInput {
    email: string;
    password: string;
}

export interface UserDeleteInput {
    id: string;
}

export interface UserTickClimb {
    id: string;
    climbId: string;
}



/*
User function return types
*/

// Return type for creating an account
export interface UserPublic {
    id: string;
    email: string;
    username: string;
    createdAt: Date
}
// Return type when logging in
export interface LoginPublic {
    id: string;
    token: string;
    username: string;
}

export interface UserDeleteOutput {
    message: string;
    deletedUserId: string;
}

export interface TickClimbOutput {
    message: string;
}