import express from 'express';
import { requireAuth } from '../middleware/requireAuth';
import * as climbControllers from '../controllers/climbControllers';

const router = express.Router();

// Endpoint to create a climb. Differentiating between user and setter will
// be done within services
router.post('/climbCreate', requireAuth, climbControllers.climbCreate);

router.delete('/climbDelete', requireAuth, climbControllers.climbDelete);

router.put('/climbEdit', requireAuth, climbControllers.climbEdit);

export default router;