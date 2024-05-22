import { Router } from 'express';
import { createSection, getSectionsByBook } from '../controllers/sectionController';

const router = Router();

router.post('/sections', createSection);
router.get('/sections', getSectionsByBook);

export default router;
