import { Router } from 'express';
import { createSouvenir, getSouvenirs, getSouvenirsByCategory, getSouvenirById } from '../Controller/SouvenirController';

const router = Router();

router.post('/souvenirs', createSouvenir);
router.get('/souvenirs', getSouvenirs);
router.get('/souvenirs/:id', getSouvenirById);
router.get('/souvenirs/category/:categoryId', getSouvenirsByCategory);

export default router;