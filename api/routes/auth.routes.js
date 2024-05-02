import express from 'express';
import {signup} from '../controllers/auth.contoller.js';
import { signin } from '../controllers/auth.contoller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;