import { loginTourist, RegisterTourist } from '../Controller/TouristController';
import { Router } from 'express'

const router = Router();

router.post("/tourist/register", RegisterTourist)
router.post("/tourist/login", loginTourist)

export default router;