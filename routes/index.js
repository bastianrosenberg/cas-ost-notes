import express from 'express'
import { noteController } from '../controllers/note-controller.js';

const router = express.Router();

router.get('/', noteController.getIndexDocument);
router.get('/create', noteController.getCreateDocument);

export const noteRoutes = router;