import express from 'express';
import {verifyToken} from '../utils/verifyUser.js';
<<<<<<< HEAD
import { create } from '../controllers/post.controller.js';
import { getposts } from '../controllers/post.controller.js';
import { deletepost } from '../controllers/post.controller.js';
import { updatepost } from '../controllers/post.controller.js';
=======
import { create, updatepost } from '../controllers/post.controller.js';
import { getposts } from '../controllers/post.controller.js';
import { deletepost } from '../controllers/post.controller.js';
>>>>>>> d6118eb72d320ae0ec62d15f4d0474997a7c853e

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

export default router;