import express from 'express';
import * as userControllers from '../controllers/userControllers';
import { requireAuth } from '../middleware/requireAuth';
// TODO: import middleware here

const router = express.Router();

/*
USER PROFILE RELATED ROUTES
*/

// this post request will be called after user clicks on register button
router.post('/userRegister', userControllers.userRegister);
// This post request will be called after user clicks on the log in button
router.post('/userLogin', userControllers.userLogin);
// This delete request will be in a user settings, and will be called when a 
// user decides to delete their account
router.delete('/userDelete', requireAuth, userControllers.userDelete);
// TODO: Write the requireAuth middleware and getCurrentUser function
// This get request will be used initially just for testing, but could
// eventually be turned into a function to help display a users profile
router.get('/getCurrentUser', requireAuth, userControllers.getCurrentUser);

router.put('/userInfoUpdate', requireAuth, userControllers.userInfoUpdate);

export default router;
