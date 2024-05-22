// src/routes/bookRoutes.ts
import { Router } from 'express';
import { createBook, getBooks } from '../controllers/bookController';

const router = Router();

router.post('/books', createBook);
router.get('/books', getBooks);

export default router;
