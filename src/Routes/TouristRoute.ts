import { RegisterTourist } from '../Controller/TouristController';
import { Router } from 'express'

const router = Router();

router.post("/tourist/register", RegisterTourist)

export default router;