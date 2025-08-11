import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import * as climbControllers from '../controllers/climbControllers';

const router = express.Router();

// Endpoint to create a climb. Differentiating between user and setter will
// be done within services

// req.body needs {climbName, setterId, grade}
// res.climb will have all the info about the climb created
router.post('/climbCreate', requireAuth, climbControllers.climbCreate);

router.delete('/climbDelete', requireAuth, climbControllers.climbDelete);

router.put('/climbEdit', requireAuth, climbControllers.climbEdit);

router.get('/climbGet', requireAuth, climbControllers.climbGet);

// req.body doesnt need anything atm, not sure if this is right
// res.data should be array of all climbs in database
router.get('/climbGetAll', requireAuth, climbControllers.climbGetAll);

export default router;