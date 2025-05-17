import { Router } from 'express';
import { createActivity, getActivities, getActivityById } from '../Controller/ActivityController';

const router = Router();

router.post('/activities', createActivity);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivityById);

export default router;