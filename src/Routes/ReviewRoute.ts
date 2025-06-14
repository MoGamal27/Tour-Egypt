import { Router } from 'express';
import { createReview, getHotelReviews } from '../api/reviews'; 

const router = Router();

router.post('/reviews', createReview);
router.get('/reviews/:hotelId', getHotelReviews);

export default router;