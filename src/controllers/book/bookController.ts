// controllers/BookController.ts
import { NextFunction, Request, Response } from 'express';
import {
  createNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
} from '../../services/bookService';
import { uploadFileToCloudinary } from '../../utils/fileUpload';
import CustomError from '../../errors/customError';
import { deleteFileFromCloudinary } from '../../utils/delFileFromCloudinary';

class BookController {

  // Create a new book  
  public async addBook(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const bookData = req.body;
      console.log(req.body);
      
      if (req.file) {
        const result = await uploadFileToCloudinary(req.file);
        bookData.imageUrl = result.secure_url;
      }
     
      
      const savedBook = await createNewBook(bookData);
      res.status(201).json(savedBook);

    } catch (error:any) {
        next(new CustomError(error.message,error.status))

    }
  }

  // Get all books 
  public async getBooks(_req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
      const books = await getAllBooks();
      res.status(200).json(books);
    }catch (error:any) {
      next(new CustomError(error.message,error.status))

    }
  }

  // Get a book by ID
  public async getBook(req: Request, res: Response ,next:NextFunction): Promise<void> {
    try {
      const bookId = req.params.id;
      const book = await getBookById(bookId);
      if (book) {
        res.status(200).json(book);
      } else {
        next(new CustomError('Book not found',404))
      }
    } catch (error:any) {
        next(new CustomError(error.message,error.status))
    }
  }

  // Update a book by ID
  public async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookId = req.params.id;
      const bookData = req.body;
      const imageFile = req.file;

      if (imageFile) {
        const result = await uploadFileToCloudinary(imageFile);
        bookData.imageUrl = result.secure_url;
        // If the book already has an imageUrl, delete the old one from Cloudinary
        const existingBook = await getBookById(bookId);
        if (existingBook && existingBook.imageUrl) {
          await deleteFileFromCloudinary(existingBook.imageUrl);
        }
      }

      const updatedBook = await updateBookById(bookId, bookData);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error: any) {
      next(new CustomError(error.message, error.status));
    }
  }

  
  // Delete a book by ID
  public async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookId = req.params.id;
      const book = await getBookById(bookId);

      if (book && book.imageUrl) {
        await deleteFileFromCloudinary(book.imageUrl);
      }

      const deletedBook = await deleteBookById(bookId);
      if (deletedBook) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        next(new CustomError('Book not found',404));
      }
    } catch (error: any) {
      next(new CustomError(error.message, error.status));
    }
  }
 
}

export default new BookController();
