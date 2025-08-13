import express from 'express';
// TODO: import userControllers here
// TODO: import middleware here

const router = express.Router();

// TODO: Write registerGym function in gymControllers
// This post will be called from a gym setup page once a user is logged in

//router.post('/gymRegister', registerGym);

// A gym wont need to 'log in', as a user who creates or is staff at a gym
// should have access to gym related things from their home portal

// TODO: Write the requireAuth middleware and getGymInfo function
// This will be used for testing, but can be extended to be used for gym info

//router.get('/gymInfo', requireAuth, getGymInfo);

export default router;
