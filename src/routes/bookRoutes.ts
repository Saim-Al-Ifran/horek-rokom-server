// routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/book/bookController';
const router = express.Router();

router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getBook);
router.post('/books', BookController.addBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

export default router;
