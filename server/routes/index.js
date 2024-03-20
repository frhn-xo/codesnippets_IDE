import express from 'express';
import { addSnippet, getSnippets } from '../controllers/snippetController.js';

const router = express.Router();

router.post('/add-snippet', addSnippet);

router.get('/get-snippets', getSnippets);

export default router;
