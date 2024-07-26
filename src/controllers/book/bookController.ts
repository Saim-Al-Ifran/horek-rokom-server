// controllers/BookController.ts
import { Request, Response } from 'express';
import {
  createNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById
} from '../../services/bookService';
import { uploadFileToCloudinary } from '../../utils/fileUpload';

class BookController {

  // Create a new book  
  public async addBook(req: Request, res: Response): Promise<void> {
    try {
      const bookData = req.body;
      if (req.file) {
        const result = await uploadFileToCloudinary(req.file);
        bookData.imageUrl = result.secure_url;
      }

      const savedBook = await createNewBook(bookData);
      res.status(201).json(savedBook);

    } catch (error) {

      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while creating the book.' });
      }

    }
  }

  // Get all books 
  public async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while fetching the books.' });
      }
    }
  }

  // Get a book by ID
  public async getBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;
      const book = await getBookById(bookId);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while fetching the book by ID.' });
      }
    }
  }

  // Update a book by ID
  public async updateBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;
      const bookData = req.body;
      const updatedBook = await updateBookById(bookId, bookData);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while updating the book.' });
      }
    }
  }
  
  // Delete a book by ID
  public async deleteBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = req.params.id;
      const deletedBook = await deleteBookById(bookId);
      if (deletedBook) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred while deleting the book.' });
      }
    }
  }
}

export default new BookController();
