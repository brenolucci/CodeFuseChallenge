// src/routes/bookRoutes.ts
import { Router } from 'express';
import { createBook, getBook, getBooks } from '../controllers/bookController';

const router = Router();

router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/book', getBook)

export default router;
