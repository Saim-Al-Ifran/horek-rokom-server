// routes/bookRoutes.ts
import express from 'express';
import BookController from '../controllers/book/bookController';
import authenticate from '../middlewares/auth/authenticate';
import authorizeAdmin from '../middlewares/auth/authorizeAdmin';
import upload from '../middlewares/uploadFile/upload';
import paginationMiddleware from '../middlewares/paginationMiddleware';
const router = express.Router();

router.get('/books',paginationMiddleware,BookController.getBooks);
router.get('/books/:id', BookController.getBook);

//routes for admin 
router.post('/books', authenticate, authorizeAdmin ,upload.single('image'),BookController.addBook);
router.put('/books/:id', authenticate, authorizeAdmin ,upload.single('image') ,BookController.updateBook);
router.delete('/books/:id', authenticate, authorizeAdmin , BookController.deleteBook);

export default router;
