import { Router } from 'express';
import { createCategory, getCategories, getCategoryById } from '../Controller/CategoryController';

const router = Router();

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);

export default router;