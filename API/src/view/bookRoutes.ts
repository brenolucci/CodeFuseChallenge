// src/routes/bookRoutes.ts
import { Router } from 'express';
import { createBook, createSection, getBooks, getSectionsByBook } from '../controllers/bookController';

const router = Router();

router.post('/books', createBook);
router.post('/sections', createSection);
router.get('/getbook', getBooks);
router.get('/getsections', getSectionsByBook);

export default router;
