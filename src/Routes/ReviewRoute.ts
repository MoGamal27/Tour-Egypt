import { Router } from 'express';
import { createReview, getAllReviews } from '../Controller/ReviewController';

const router = Router();

router.post('/reviews', createReview);
router.get('/reviews', getAllReviews);

export default router;