import express from 'express';
import {signup} from '../controllers/auth.contoller.js';
import {signin} from '../controllers/auth.contoller.js';
import { google } from '../controllers/auth.contoller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;