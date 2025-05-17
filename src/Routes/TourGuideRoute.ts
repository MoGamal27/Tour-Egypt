import { RegisterTourGuide, getTourguideById, getAllTourGuides } from "../Controller/TourGuideController";
import { Router } from 'express'

const router = Router();

router.post("/tourguide/register", RegisterTourGuide)
router.get("/tourguide", getAllTourGuides)
router.get("/tourguide/:id", getTourguideById)


export default router;