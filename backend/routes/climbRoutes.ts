import express from 'express';

const router = express.Router();

// Two different climb create post requests. One for official gym climbs and
// one for user created climbs
router.post('/climbCreateUser', requireAuth, climbControllers.climbCreateUser);
router.post('/climbCreateSetter', requireAuth, climbControllers.climbCreateSetter);

router.post('/climbInfoUpdate', requireAuth, climbControllers.climbInfoUpdate);
export default router;