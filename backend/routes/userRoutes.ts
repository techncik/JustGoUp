import express from 'express';
import * as userControllers from '../controllers/userControllers';
import { createUser } from '../services/userServices';
// TODO: import middleware here

const router = express.Router();

/*
USER PROFILE RELATED ROUTES
*/
// TODO: Write registerUser function in userControllers. 
// this post request will be called after user clicks on register button
router.post('/userRegister', userControllers.userRegister);

// TODO: Write userLogin function in userControllers.
// This post request will be called after user clicks on the log in button
router.post('/login', userControllers.userLogin);

// TODO: Write the requireAuth middleware and getCurrentUser function
// This get request will be used initially just for testing, but could
// eventually be turned into a function to help display a users profile
router.get('/me', requireAuth, getCurrentUser);

/*
USER CLIMB RELATED ROUTES
*/

export default router;
