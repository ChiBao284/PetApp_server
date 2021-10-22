import express from 'express';
import { append } from 'vary';
import { getPosts, createPosts, updatePosts } from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);

router.post('/', createPosts);

router.post('/update', updatePosts);

export default router;
