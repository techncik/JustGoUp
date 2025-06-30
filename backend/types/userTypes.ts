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

}



/*
User function return types
*/

export interface PublicUser {
    id: string;
    email: string;
    username: string;
    createdAt: Date
}